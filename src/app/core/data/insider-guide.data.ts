export interface GuidePost {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  content: string;
  keywords: string;
}

export const GUIDE_POSTS: Record<string, GuidePost> = {
  'kelve-beach-guide': {
    id: 'kelve-beach-guide',
    title: 'The Ultimate Local Guide to Kelve Beach',
    description: 'Everything you need to know about visiting Kelve Beach, the famous Suru trees, and nearby historical forts.',
    image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776516148/image_ytjusr.png',
    date: '2026-05-18',
    author: 'Sanjivani Locals',
    readTime: '6 min read',
    keywords: 'kelve beach, kelve fort, palghar beaches, maharashtra tourism, beaches near mumbai',
    content: `
      <h2>Why Kelve Beach is a Must-Visit</h2>
      <p>Located in the Palghar district, Kelve Beach offers one of the most pristine and longest coastlines in Maharashtra. Unlike the heavily crowded beaches of Mumbai, Kelve retains its natural charm, bordered by an endless row of beautiful Suru (Casuarina) trees that provide natural shade and a picture-perfect backdrop for photography.</p>
      
      <h2>Historical Forts & Attractions</h2>
      <p>History enthusiasts will be thrilled to know that Kelve is home to several ancient forts. Right on the beach, you can explore the <strong>Kelve Fort</strong>, originally built by the Portuguese. A short distance away lies the stunning <strong>Shirgaon Fort</strong>. These structures offer incredible glimpses into the region's rich maritime history and provide breathtaking sunset views over the Arabian Sea.</p>
      
      <h2>Where to Stay: Beachfront vs. Inland Agritourism</h2>
      <p>While staying right on the beach might sound appealing, beachside lodges can often be crowded and noisy during weekends. Savvy travelers are increasingly choosing to stay slightly inland at luxury agritourism resorts like <strong>Sanjivani Farm</strong>.</p>
      <p>Located just a short drive from Kelve Beach, Sanjivani Farm offers the best of both worlds. You can spend your afternoon enjoying the beach, and return in the evening to a peaceful, private 16-acre farm. Instead of sharing a cramped hotel pool, you get access to private kayaking lakes, a miniature Toy Train, and lush organic coconut groves—all while enjoying authentic, farm-to-table Maharashtrian cuisine.</p>
    `
  },
  'digital-detox-weekend': {
    id: 'digital-detox-weekend',
    title: 'Why a Digital Detox is the Best Weekend Getaway',
    description: 'Learn why swapping screen time for nature time at a farm stay is the ultimate reset for your mental health.',
    image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776531113/download_20_ntzfol.jpg',
    date: '2026-05-15',
    author: 'Sanjivani Wellness',
    readTime: '5 min read',
    keywords: 'digital detox retreat, farm stay wellness, nature resort maharashtra, weekend getaway near vasai virar, mental health break',
    content: `
      <h2>The Need to Unplug</h2>
      <p>In our hyper-connected, fast-paced world, true luxury is no longer about high-speed internet—it's about the ability to disconnect. The constant barrage of emails, social media notifications, and news alerts has led to record levels of burnout. A digital detox allows your mind to rest, significantly reducing stress, lowering anxiety levels, and vastly improving your sleep quality.</p>
      
      <h2>The Sanjivani Approach to Reconnection</h2>
      <p>At Sanjivani Farm, we’ve purposefully designed our 16-acre sanctuary to encourage this detox. While we understand the need for occasional connectivity, we intentionally restrict Wi-Fi to our common areas. When you retreat to your wooden cottage or walk through our dense coconut groves, you are completely free from the digital noise.</p>
      
      <h2>Swapping Screens for Real Experiences</h2>
      <p>What do you do when you put the phone down? You live.</p>
      <ul>
        <li><strong>Sunrise Walks:</strong> Wander through 700+ coconut trees listening to the morning birds.</li>
        <li><strong>Kayaking:</strong> Paddle across our private lakes, feeling the water and the breeze instead of a glass screen.</li>
        <li><strong>The Toy Train:</strong> Embrace childlike joy with a ride on our exclusive miniature railway.</li>
        <li><strong>Farm-to-Table Dining:</strong> Actually taste your food and engage in deep, uninterrupted conversations with your loved ones.</li>
      </ul>
      <p>A weekend at a true nature resort doesn't just recharge your phone; it recharges your soul.</p>
    `
  },
  'agritourism-over-hotels': {
    id: 'agritourism-over-hotels',
    title: '5 Reasons to Choose Agritourism Over a Standard Hotel',
    description: 'Discover why farm stays and agritourism resorts are becoming the top choice for travelers seeking authentic experiences.',
    image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776504223/IMG_9378_1_tvoocw.jpg',
    date: '2026-06-02',
    author: 'Sanjivani Experts',
    readTime: '7 min read',
    keywords: 'agritourism near mumbai, organic farm stay maharashtra, palghar farm, eco tourism, sustainable travel',
    content: `
      <h2>What is Agritourism?</h2>
      <p>Agritourism bridges the gap between agriculture and tourism, allowing guests to experience farm life, connect with nature, and enjoy rural hospitality. For city dwellers from Mumbai, Thane, and Vasai-Virar, it offers an unparalleled escape from concrete jungles.</p>

      <h2>1. Space and Privacy</h2>
      <p>Standard hotels trap you in corridors and lobbies. At an agritourism resort like Sanjivani Farm, your "lobby" is a sprawling 16-acre estate. You have the freedom to roam through lush green lawns, cross wooden bridges, and relax in hammock gardens without bumping into crowds.</p>

      <h2>2. Authentic, Organic Food</h2>
      <p>Forget the generic buffet. Farm stays pride themselves on farm-to-table dining. Meals are prepared using locally sourced, often organic ingredients grown right on the property. The authentic, rustic Maharashtrian flavors you experience here simply cannot be replicated in a commercial hotel kitchen.</p>

      <h2>3. Unique Activities for All Ages</h2>
      <p>Hotels might offer a gym and a pool, but a farm stay offers <em>experiences</em>. From private kayaking and fishing in serene lakes to riding a custom-built Toy Train through the fields, agritourism provides memorable activities that bring families closer together.</p>

      <h2>4. Educational Value</h2>
      <p>It’s not just a vacation; it’s a learning experience. Children get to see where their food comes from, learn about seasonal farming, and interact with the natural ecosystem. It’s an invaluable lesson in sustainability and respect for nature.</p>

      <h2>5. Supporting Local Communities</h2>
      <p>When you choose a farm stay, your money directly supports local farmers, artisans, and rural economies. It’s a sustainable form of travel that ensures the beautiful landscapes of regions like Palghar are preserved for generations to come.</p>
    `
  },
  'corporate-outings-mumbai': {
    id: 'corporate-outings-mumbai',
    title: 'Planning the Perfect Corporate Outing Near Mumbai',
    description: 'How to organize a memorable, team-building corporate retreat away from the city hustle.',
    image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496178/IMG_9395_1_iojzsx.jpg',
    date: '2026-06-10',
    author: 'Sanjivani Events',
    readTime: '6 min read',
    keywords: 'corporate outing near vasai, team building resort palghar, day picnic venue, company retreat maharashtra',
    content: `
      <h2>The Shift in Corporate Retreats</h2>
      <p>Gone are the days when a corporate outing meant a sterile conference room in a 5-star hotel. Today’s forward-thinking companies recognize that true team building happens in nature, where employees can drop their professional guards and connect on a human level.</p>

      <h2>Why Palghar is the Perfect Destination</h2>
      <p>Located just a few hours from Mumbai and easily accessible from Vasai-Virar, the Palghar district offers the perfect blend of accessibility and isolation. It’s close enough to avoid travel fatigue, but distant enough to feel like a completely different world.</p>

      <h2>Key Ingredients for a Successful Outing</h2>
      <ul>
        <li><strong>Open Spaces for Team Building:</strong> You need large, open lawns for physical activities and ice-breakers. Sanjivani Farm's lush open lawns provide the perfect canvas for team games.</li>
        <li><strong>Comfortable Group Accommodation:</strong> While luxury cottages are great for executives, having high-quality dormitory options ensures that large teams can stay together comfortably and affordably.</li>
        <li><strong>Engaging Activities:</strong> A great resort provides built-in entertainment. Whether it's friendly kayaking races on the lake or a relaxed group ride on the Toy Train, shared experiences build stronger teams.</li>
        <li><strong>Excellent Catering:</strong> Food makes or breaks an event. Opt for venues that offer unlimited, delicious, homestyle meals that cater to various dietary preferences.</li>
      </ul>

      <h2>The Sanjivani Advantage</h2>
      <p>At Sanjivani Farm, we specialize in hosting corporate day picnics and overnight retreats. Our dedicated event spaces, combined with the natural beauty of our 16-acre estate, provide the ideal environment for brainstorming, bonding, and genuine relaxation.</p>
    `
  }
};
