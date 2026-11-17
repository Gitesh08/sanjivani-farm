/**
 * Sanjivani Farm & Resort — Google Maps Reviews Scraper & Syncer
 *
 * Runs automatically via GitHub Actions (or locally) to keep Google
 * reviews, rating score, and total review count updated for Sanjivani Farm & Resort.
 *
 * 100% Free Headless Scraper:
 * - Uses Puppeteer to load the public Google Maps listing.
 * - Extracts recent 5-star reviews, real-time rating (e.g. 4.4 ★), and total review count.
 * - Requires NO Google Cloud account, NO API key, and NO billing.
 *
 * Resilience & Fallback Rule:
 * - If scraping succeeds, it saves to `reviews.json` and `reviews-summary.json`.
 * - If scraping cannot run or encounters an issue, the script NEVER modifies or blanks
 *   out the existing files. It retains the last known good data intact as a fallback.
 */

const fs = require('node:fs');
const path = require('node:path');

const REVIEWS_FILE_PATH = path.resolve(__dirname, '../src/assets/data/reviews.json');
const SUMMARY_FILE_PATH = path.resolve(__dirname, '../src/assets/data/reviews-summary.json');

// Direct Google Maps reviews link for Sanjivani Farm & Resort (!9m1!1b1 opens reviews tab directly)
const MAPS_URL = 'https://www.google.com/maps/place/Sanjivani+Farm+%26+Resort/@19.5983845,72.7671736,17z/data=!4m11!3m10!1s0x3be7039d2a6f5b01:0x89b4fe262a5bd81f!5m2!4m1!1i2!8m2!3d19.5983845!4d72.7671736!9m1!1b1!16s%2Fg%2F11rsdqvzq8';

/**
 * Automatically detects installed Chrome or Chromium binary across OS platforms
 */
function getChromeExecutablePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  // Windows Chrome and Edge paths
  if (process.platform === 'win32') {
    const winPaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Google\\Chrome\\Application\\chrome.exe') : null,
      process.env.PROGRAMFILES ? path.join(process.env.PROGRAMFILES, 'Google\\Chrome\\Application\\chrome.exe') : null,
      process.env['PROGRAMFILES(X86)'] ? path.join(process.env['PROGRAMFILES(X86)'], 'Google\\Chrome\\Application\\chrome.exe') : null,
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
    ];
    for (const p of winPaths) {
      if (p && fs.existsSync(p)) return p;
    }
  }

  // Linux paths (Ubuntu / GitHub Actions runner)
  if (process.platform === 'linux') {
    const linuxPaths = [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium'
    ];
    for (const p of linuxPaths) {
      if (fs.existsSync(p)) return p;
    }
  }

  // macOS paths
  if (process.platform === 'darwin') {
    const macPaths = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium'
    ];
    for (const p of macPaths) {
      if (fs.existsSync(p)) return p;
    }
  }

  return undefined;
}

/**
 * Safely reads existing reviews from disk
 */
function getExistingReviews() {
  try {
    if (fs.existsSync(REVIEWS_FILE_PATH)) {
      const data = fs.readFileSync(REVIEWS_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('⚠️ Could not read existing reviews:', err.message);
  }
  return [];
}

/**
 * Safely reads existing summary from disk
 */
function getExistingSummary() {
  try {
    if (fs.existsSync(SUMMARY_FILE_PATH)) {
      const data = fs.readFileSync(SUMMARY_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('⚠️ Could not read existing summary:', err.message);
  }
  return { rating: 4.4, userRatingsTotal: 500 };
}

/**
 * Cleans and beautifies raw scraped Google review text, extracts sub-ratings and metadata.
 */
function cleanAndBeautifyGoogleReview(rawText) {
  if (!rawText) return { cleanText: '', subRatings: null, hotelHighlights: [], tripType: '', travelGroup: '' };

  let text = rawText;
  const subRatings = {};
  let hotelHighlights = [];
  let tripType = '';
  let travelGroup = '';

  const tripMatch = text.match(/Trip type:?\s*([A-Za-z\s]+?)(?=(Travel group|Rooms:|Service:|Location:|Hotel highlights|$))/i);
  if (tripMatch) tripType = tripMatch[1].trim();

  const groupMatch = text.match(/Travel group:?\s*([A-Za-z\s]+?)(?=(Trip type|Rooms:|Service:|Location:|Hotel highlights|$))/i);
  if (groupMatch) travelGroup = groupMatch[1].trim();

  const roomsMatch = text.match(/Rooms:\s*(\d+)/i);
  if (roomsMatch) subRatings.rooms = parseInt(roomsMatch[1], 10);

  const serviceMatch = text.match(/Service:\s*(\d+)/i);
  if (serviceMatch) subRatings.service = parseInt(serviceMatch[1], 10);

  const locMatch = text.match(/Location:\s*(\d+)/i);
  if (locMatch) subRatings.location = parseInt(locMatch[1], 10);

  const highMatch = text.match(/Hotel highlights:?\s*(.+?)$/i);
  if (highMatch) {
    hotelHighlights = highMatch[1].split(/,\s*/).map(s => s.trim()).filter(Boolean);
  }

  // Remove metadata block
  const metaRegex = /(?:Trip type|Travel group|Rooms:\s*\d|Hotel highlights)/i;
  const idx = text.search(metaRegex);
  if (idx !== -1) {
    text = text.slice(0, idx).trim();
  }

  // Beautify Pros & Cons
  text = text.replace(/([^\n])\s*(Cons:?)/gi, '$1\n\nCons:');
  text = text.replace(/([^\n])\s*(Pros:?)/gi, '$1\n\nPros:');

  // Space out sentences stuck together
  text = text.replace(/([a-zA-Z])([.!?])([A-Z])/g, '$1$2 $3');

  return {
    cleanText: text.trim(),
    subRatings: Object.keys(subRatings).length ? subRatings : null,
    hotelHighlights,
    tripType,
    travelGroup
  };
}

/**
 * Saves reviews with fallback protection.
 * Only saves if we have at least 3 genuine reviews.
 */
function saveReviews(reviews) {
  if (!reviews || !Array.isArray(reviews) || reviews.length < 3) {
    console.log('⚠️ Scraped reviews count is insufficient (< 3). Fallback active: retaining last saved reviews.');
    return false;
  }

  // Beautify and filter: Keep genuine 5-star reviews with substantive feedback
  const processed = reviews.map(r => {
    const rawText = r?.review?.text || '';
    const parsed = cleanAndBeautifyGoogleReview(rawText);
    const travelGroup = parsed.travelGroup 
      ? (parsed.travelGroup.toLowerCase().includes('stay') ? parsed.travelGroup : `${parsed.travelGroup} Stay`)
      : (r?.review?.tag || 'Family Farm Stay');

    return {
      ...r,
      review: {
        ...r.review,
        text: parsed.cleanText,
        tag: travelGroup,
        highlight: parsed.hotelHighlights[0] || r?.review?.highlight || '',
        subRatings: parsed.subRatings,
        hotelHighlights: parsed.hotelHighlights,
        tripType: parsed.tripType,
        travelGroup: parsed.travelGroup
      }
    };
  });

  const filtered = processed.filter(r => {
    const rating = r?.review?.rating || 0;
    const text = r?.review?.text || '';
    return rating >= 5 && text.trim().length >= 15;
  });

  // Deduplicate reviews by author name
  const seen = new Set();
  const unique = [];
  for (const r of filtered) {
    const key = (r.author?.name || '').trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    unique.push(r);
  }

  const finalReviews = (unique.length >= 3 ? unique : filtered).slice(0, 15);

  fs.writeFileSync(REVIEWS_FILE_PATH, JSON.stringify(finalReviews, null, 2), 'utf-8');
  console.log(`✅ Successfully synced ${finalReviews.length} fresh 5-star reviews to:`);
  console.log(`   ${REVIEWS_FILE_PATH}`);
  return true;
}

/**
 * Updates summary metrics (rating score & total reviews count) with validation
 */
function updateSummary(rating, userRatingsTotal) {
  const current = getExistingSummary();
  const validRating = (typeof rating === 'number' && rating >= 3.0 && rating <= 5.0) ? rating : current.rating;
  const validTotal = (typeof userRatingsTotal === 'number' && userRatingsTotal >= 50) ? userRatingsTotal : current.userRatingsTotal;

  const summary = {
    rating: validRating,
    userRatingsTotal: validTotal,
    lastSynced: new Date().toISOString()
  };

  fs.writeFileSync(SUMMARY_FILE_PATH, JSON.stringify(summary, null, 2), 'utf-8');
  console.log(`✅ Updated reviews summary: ${summary.rating} ★ (${summary.userRatingsTotal}+ reviews)`);
}

/**
 * Headless Browser Scraper using Puppeteer
 * Runs 100% free on GitHub Actions Ubuntu runners and locally.
 */
async function scrapeViaPuppeteer() {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch {
    console.log('\nℹ️ Puppeteer is not installed in the local environment.');
    console.log('   In GitHub Actions, the workflow installs it automatically.');
    console.log('   To test locally: npm install -D puppeteer\n');
    return null;
  }

  const chromePath = getChromeExecutablePath();
  const launchOptions = {
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--lang=en-US,en'
    ]
  };

  if (chromePath) {
    console.log(`🚀 Using Chrome binary: ${chromePath}`);
    launchOptions.executablePath = chromePath;
  } else {
    console.log('🚀 Using bundled Puppeteer Chromium...');
  }

  const browser = await puppeteer.launch(launchOptions);

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

    console.log('📍 Navigating to Sanjivani Farm & Resort on Google Maps...');
    await page.goto(MAPS_URL, { waitUntil: 'networkidle2', timeout: 35000 });

    // Handle cookie consent dialog if presented
    try {
      const consentBtn = await page.$('button[aria-label="Accept all"], form[action*="consent"] button');
      if (consentBtn) {
        await consentBtn.click();
        await new Promise(r => setTimeout(r, 1200));
      }
    } catch {
      // Consent not required
    }

    // Wait for reviews or summary container to render
    console.log('⏳ Waiting for Google reviews container to render...');
    try {
      await page.waitForSelector('div[data-review-id], .jftiEf, div.jANrlb', { timeout: 15000 });
    } catch (e) {
      console.warn('⚠️ Review container selector wait timed out:', e.message);
    }

    // Extract summary metrics (rating & review count)
    const summaryData = await page.evaluate(() => {
      let rating = null;
      let userRatingsTotal = null;

      // Extract rating score (e.g. "4.4")
      const scoreEl = document.querySelector('div.jANrlb div.fontDisplayLarge, span.fontDisplayLarge, span.ceNzKf');
      if (scoreEl) {
        const val = parseFloat(scoreEl.textContent.trim().replace(',', '.'));
        if (!isNaN(val) && val >= 3.0 && val <= 5.0) rating = val;
      }

      // Extract total count (e.g. "503 reviews" or "500 reviews")
      const countEl = document.querySelector('div.jANrlb div.fontBodySmall, span[aria-label*="reviews"], span.fontBodySmall');
      if (countEl) {
        const num = parseInt(countEl.textContent.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(num) && num > 50) userRatingsTotal = num;
      }

      return { rating, userRatingsTotal };
    });

    if (summaryData.rating || summaryData.userRatingsTotal) {
      updateSummary(summaryData.rating, summaryData.userRatingsTotal);
    }

    // Expand truncated reviews if "More" buttons are present
    const moreButtons = await page.$$('button.w8nwRe, button[aria-label="See more"]');
    for (const btn of moreButtons.slice(0, 10)) {
      try {
        await btn.click();
      } catch {
        // Ignored
      }
    }

    // Extract individual review cards
    const reviews = await page.evaluate(() => {
      const cards = document.querySelectorAll('div[data-review-id], .jftiEf');
      const results = [];

      cards.forEach(card => {
        // Author name
        const nameEl = card.querySelector('.d4r55, .WNxIKb, button.WEBjAf');
        const name = nameEl ? nameEl.textContent.trim() : 'Guest';

        // Author profile photo
        const imgEl = card.querySelector('img.NBa7we, img');
        let profile_url = imgEl ? (imgEl.getAttribute('src') || '') : '';
        if (profile_url && profile_url.includes('googleusercontent.com')) {
          profile_url = profile_url.replace(/=w\d+-h\d+[^"]*/, '=s120-c');
        }

        // Star rating
        const ratingEl = card.querySelector('span.kvMYJc, [aria-label*="star"], [aria-label*="Star"]');
        let rating = 5;
        if (ratingEl) {
          const aria = ratingEl.getAttribute('aria-label') || '';
          const match = aria.match(/(\d+)/);
          if (match) rating = parseInt(match[1], 10);
        }

        // Review text
        const textEl = card.querySelector('.wiI7pd, .MyEned');
        const text = textEl ? textEl.textContent.trim() : '';

        // Relative publication time
        const timeEl = card.querySelector('.rsqaWe');
        const published = timeEl ? timeEl.textContent.trim() : 'recently';

        // Local guide badge if present
        const badgeEl = card.querySelector('.RfnDt, .WNxIKb');
        const badge = badgeEl ? badgeEl.textContent.trim() : 'Verified Guest';

        if (text && rating >= 5) {
          results.push({
            author: { name, profile_url, badge },
            review: { text, rating, tag: 'Family Farm Stay', highlight: '' },
            time: { published }
          });
        }
      });

      return results;
    });

    console.log(`🔍 Scraped ${reviews.length} reviews from Google Maps via Puppeteer.`);
    return reviews;
  } finally {
    await browser.close();
  }
}

/**
 * Main Orchestration
 */
async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('   Sanjivani Farm & Resort — Google Reviews Sync Runner');
  console.log('═══════════════════════════════════════════════════════════════\n');

  let success = false;

  try {
    const reviews = await scrapeViaPuppeteer();
    if (reviews && reviews.length > 0) {
      success = saveReviews(reviews);
    }
  } catch (scrapeErr) {
    console.warn('⚠️ Puppeteer scraper encountered an issue:', scrapeErr.message);
  }

  // Fallback Check
  const existingReviews = getExistingReviews();
  const existingSummary = getExistingSummary();

  if (success) {
    console.log('\n🎉 Sync cycle completed successfully with fresh live data.');
  } else {
    console.log('\n🛡️ Fallback active: Scrape did not complete.');
    console.log(`   Preserved ${existingReviews.length} existing reviews.`);
    console.log(`   Preserved rating (${existingSummary.rating} ★) and count (${existingSummary.userRatingsTotal}+).`);
    console.log('   Website remains fully functional with fallback data.');
  }
}

main().catch(err => {
  console.error('Unhandled script error:', err);
  process.exit(0); // Exit code 0 ensures CI/CD pipeline never fails
});
