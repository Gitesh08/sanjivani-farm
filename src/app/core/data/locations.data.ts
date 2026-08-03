export interface LocationData {
  id: string;
  name: string;
  type: string; // e.g., 'Beach', 'City', 'Fort'
  distance: string;
  driveTime: string;
  heroHeadline: string;
  heroSubheadline: string;
  seoDescription: string;
  keywords: string;
  attractions: string[];
}

export const LOCATIONS: Record<string, LocationData> = {
  "saphale": {
    "id": "saphale",
    "name": "Saphale",
    "type": "Town",
    "distance": "8 km",
    "driveTime": "15 mins",
    "heroHeadline": "The Best Resort Near Saphale",
    "heroSubheadline": "Escape to 16 acres of pure nature just 15 minutes from Saphale station. Experience our private toy train, kayaking, and best lawn.",
    "seoDescription": "Looking for a resort near Saphale? Sanjivani Farm offers cozy cottages, a private toy train, and serene lakes just 15 mins from Saphale station.",
    "keywords": "resorts with activities near sapahale, resort near saphale, farm stay saphale, weekend getaway saphale, cozy cottages, best lawn",
    "attractions": [
      "Tandulwadi Fort (Trekking)",
      "Vajreshwari Temple (Nearby)"
    ]
  },
  "kelve": {
    "id": "kelve",
    "name": "Kelve Beach",
    "type": "Beach",
    "distance": "15 km",
    "driveTime": "30 mins",
    "heroHeadline": "Premium Stay Near Kelve Beach",
    "heroSubheadline": "Combine the thrill of Kelve Beach with the tranquility of our 16-acre farm stay. Private boating, toy train, and cozy cottages.",
    "seoDescription": "Find the perfect stay near Kelve Beach. Sanjivani Farm is a 16-acre luxury farm stay with private lakes, resorts with activities near beaches like kelve.",
    "keywords": "resorts near beaches like kelve, kelve beach resort, stay near kelve beach, farm stay kelve, cozy cottages, resorts with activities",
    "attractions": [
      "Kelve Beach",
      "Kelve Fort",
      "Shirgaon Fort"
    ]
  },
  "kelve-road": {
    "id": "kelve-road",
    "name": "Kelve Road",
    "type": "Station",
    "distance": "10 km",
    "driveTime": "20 mins",
    "heroHeadline": "Top Resort Near Kelve Road Station",
    "heroSubheadline": "Your perfect nature retreat starts here. Enjoy cozy cottages, the best lawn, and resorts with activities near Kelve Road.",
    "seoDescription": "Looking for resorts near Kelve Road station? Experience 16 acres of pure bliss with our cozy cottages, private boating, and best lawn.",
    "keywords": "resorts near kelve road station, farm near kelve road, cozy cottages, best lawn, resorts with activities",
    "attractions": [
      "Kelva Beach (Nearby)",
      "Shirgaon Fort"
    ]
  },
  "mahim-beach": {
    "id": "mahim-beach",
    "name": "Mahim Beach",
    "type": "Beach",
    "distance": "18 km",
    "driveTime": "35 mins",
    "heroHeadline": "Nature Resort Near Mahim Beach",
    "heroSubheadline": "Relax at one of the finest resorts with activities near beaches like Mahim. Perfect weekend gateway with lush green surroundings.",
    "seoDescription": "Explore the best resort near Mahim beach. Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and private boating experiences.",
    "keywords": "resorts near mahim beach, resorts near beaches like mahim, cozy cottages near mahim, best lawn resort mahim, beachside activities",
    "attractions": [
      "Mahim Beach",
      "Kelva Beach"
    ]
  },
  "vasai-virar": {
    "id": "vasai-virar",
    "name": "Vasai-Virar",
    "type": "City",
    "distance": "45 km",
    "driveTime": "1 hour",
    "heroHeadline": "The Ultimate Weekend Getaway from Vasai-Virar",
    "heroSubheadline": "Trade the city noise for 700+ coconut trees, best lawns, and private kayaking. The perfect family resort near Vasai Virar.",
    "seoDescription": "The best weekend getaway from Vasai-Virar. Book your stay at Sanjivani Farm for a luxury nature retreat with a toy train, cozy cottages, and boating.",
    "keywords": "resorts with activities near vasai virar, weekend getaway vasai virar, resort near vasai, corporate outing vasai, cozy cottages, best lawn",
    "attractions": [
      "Vasai Fort",
      "Arnala Fort",
      "Jivdani Devi Temple"
    ]
  },
  "virar": {
    "id": "virar",
    "name": "Virar",
    "type": "Station",
    "distance": "40 km",
    "driveTime": "55 mins",
    "heroHeadline": "A Relaxing Resort Near Virar Station",
    "heroSubheadline": "Escape the bustling Virar city and retreat into 16 acres of Konkan bliss. Experience nature, cozy cottages, and fun activities.",
    "seoDescription": "Discover an amazing resort near Virar station. Enjoy a luxurious farm stay, the best lawn for events, and resorts with activities just a short drive away.",
    "keywords": "resorts near virar station, farm near virar, resorts with activities near virar, cozy cottages, best lawn",
    "attractions": [
      "Arnala Beach",
      "Jivdani Temple",
      "Yazoo Park"
    ]
  },
  "mumbai": {
    "id": "mumbai",
    "name": "Mumbai",
    "type": "City",
    "distance": "90 km",
    "driveTime": "1.5 hours",
    "heroHeadline": "Best Weekend Resort from Mumbai",
    "heroSubheadline": "Just a short drive or train ride from Mumbai stations, uncover our pristine 16-acre farm with a private toy train and cozy cottages.",
    "seoDescription": "Looking for resorts near Mumbai stations? Sanjivani Farm is a premier farm stay offering resorts with activities, best lawn, and an authentic Konkan experience.",
    "keywords": "resorts near mumbai stations, resorts with activities near mumbai, weekend getaway from mumbai, cozy cottages near mumbai, farm stay mumbai",
    "attractions": [
      "Gateway of India",
      "Marine Drive",
      "Elephanta Caves"
    ]
  },
  "palghar": {
    "id": "palghar",
    "name": "Palghar",
    "type": "District Headquarter",
    "distance": "20 km",
    "driveTime": "40 mins",
    "heroHeadline": "Luxury Farm Stay in Palghar",
    "heroSubheadline": "Discover Palghar's best-kept secret. 16 acres of pristine Konkan agritourism with cozy cottages, best lawn, and exclusive digital detox zones.",
    "seoDescription": "Experience the premier farm stay in Palghar. Sanjivani Farm features 16 acres of nature, a toy train, resorts with activities, and cozy cottages.",
    "keywords": "resorts with activities near palghar, farm stay palghar, palghar resort, nature resort palghar, cozy cottages, best lawn",
    "attractions": [
      "Kelva Beach",
      "Shirgaon Fort",
      "Mahim Beach"
    ]
  },
  "shirgaon-beach": {
    "id": "shirgaon-beach",
    "name": "Shirgaon Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Shirgaon Beach",
    "heroSubheadline": "Combine the coastal beauty of Shirgaon Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Shirgaon Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near shirgaon beach, farm near shirgaon beach, resorts with activities near shirgaon beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "suruchi-beach": {
    "id": "suruchi-beach",
    "name": "Suruchi Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Suruchi Beach",
    "heroSubheadline": "Combine the coastal beauty of Suruchi Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Suruchi Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near suruchi beach, farm near suruchi beach, resorts with activities near suruchi beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "arnala-beach": {
    "id": "arnala-beach",
    "name": "Arnala Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Arnala Beach",
    "heroSubheadline": "Combine the coastal beauty of Arnala Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Arnala Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near arnala beach, farm near arnala beach, resorts with activities near arnala beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "dahanu-beach": {
    "id": "dahanu-beach",
    "name": "Dahanu Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Dahanu Beach",
    "heroSubheadline": "Combine the coastal beauty of Dahanu Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Dahanu Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near dahanu beach, farm near dahanu beach, resorts with activities near dahanu beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "bordi-beach": {
    "id": "bordi-beach",
    "name": "Bordi Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Bordi Beach",
    "heroSubheadline": "Combine the coastal beauty of Bordi Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Bordi Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near bordi beach, farm near bordi beach, resorts with activities near bordi beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "navapur-beach": {
    "id": "navapur-beach",
    "name": "Navapur Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Navapur Beach",
    "heroSubheadline": "Combine the coastal beauty of Navapur Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Navapur Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near navapur beach, farm near navapur beach, resorts with activities near navapur beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "tarapur-beach": {
    "id": "tarapur-beach",
    "name": "Tarapur Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Tarapur Beach",
    "heroSubheadline": "Combine the coastal beauty of Tarapur Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Tarapur Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near tarapur beach, farm near tarapur beach, resorts with activities near tarapur beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "chinchani-beach": {
    "id": "chinchani-beach",
    "name": "Chinchani Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Chinchani Beach",
    "heroSubheadline": "Combine the coastal beauty of Chinchani Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Chinchani Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near chinchani beach, farm near chinchani beach, resorts with activities near chinchani beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "kalam-beach": {
    "id": "kalam-beach",
    "name": "Kalam Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Kalam Beach",
    "heroSubheadline": "Combine the coastal beauty of Kalam Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Kalam Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near kalam beach, farm near kalam beach, resorts with activities near kalam beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "rajodi-beach": {
    "id": "rajodi-beach",
    "name": "Rajodi Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Rajodi Beach",
    "heroSubheadline": "Combine the coastal beauty of Rajodi Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Rajodi Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near rajodi beach, farm near rajodi beach, resorts with activities near rajodi beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "rangaon-beach": {
    "id": "rangaon-beach",
    "name": "Rangaon Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Rangaon Beach",
    "heroSubheadline": "Combine the coastal beauty of Rangaon Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Rangaon Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near rangaon beach, farm near rangaon beach, resorts with activities near rangaon beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "bhuigaon-beach": {
    "id": "bhuigaon-beach",
    "name": "Bhuigaon Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Bhuigaon Beach",
    "heroSubheadline": "Combine the coastal beauty of Bhuigaon Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Bhuigaon Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near bhuigaon beach, farm near bhuigaon beach, resorts with activities near bhuigaon beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "gorai-beach": {
    "id": "gorai-beach",
    "name": "Gorai Beach",
    "type": "Beach",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Luxury Resort Near Gorai Beach",
    "heroSubheadline": "Combine the coastal beauty of Gorai Beach with the tranquility of our 16-acre farm stay featuring cozy cottages and best lawns.",
    "seoDescription": "Find the perfect stay near Gorai Beach. Sanjivani Farm is a premier luxury resort offering activities, boating, and a private toy train.",
    "keywords": "resorts near gorai beach, farm near gorai beach, resorts with activities near gorai beach, cozy cottages, best lawn, luxury farm stay, beaches near palghar, hidden beaches maharashtra",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "jivdani-temple": {
    "id": "jivdani-temple",
    "name": "Jivdani Temple",
    "type": "Temple",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Serene Stay Near Jivdani Temple",
    "heroSubheadline": "After seeking blessings at Jivdani Temple, retreat to our peaceful 16-acre nature resort for relaxation in our cozy cottages.",
    "seoDescription": "Looking for the perfect resort near Jivdani Temple? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near jivdani temple, farm near jivdani temple, resorts with activities near jivdani temple, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "tungareshwar-temple": {
    "id": "tungareshwar-temple",
    "name": "Tungareshwar Temple",
    "type": "Temple",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Serene Stay Near Tungareshwar Temple",
    "heroSubheadline": "After seeking blessings at Tungareshwar Temple, retreat to our peaceful 16-acre nature resort for relaxation in our cozy cottages.",
    "seoDescription": "Looking for the perfect resort near Tungareshwar Temple? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near tungareshwar temple, farm near tungareshwar temple, resorts with activities near tungareshwar temple, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "vajreshwari-temple": {
    "id": "vajreshwari-temple",
    "name": "Vajreshwari Temple",
    "type": "Temple",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Serene Stay Near Vajreshwari Temple",
    "heroSubheadline": "After seeking blessings at Vajreshwari Temple, retreat to our peaceful 16-acre nature resort for relaxation in our cozy cottages.",
    "seoDescription": "Looking for the perfect resort near Vajreshwari Temple? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near vajreshwari temple, farm near vajreshwari temple, resorts with activities near vajreshwari temple, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "mahalaxmi-temple": {
    "id": "mahalaxmi-temple",
    "name": "Mahalaxmi Temple",
    "type": "Temple",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Serene Stay Near Mahalaxmi Temple",
    "heroSubheadline": "After seeking blessings at Mahalaxmi Temple, retreat to our peaceful 16-acre nature resort for relaxation in our cozy cottages.",
    "seoDescription": "Looking for the perfect resort near Mahalaxmi Temple? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near mahalaxmi temple, farm near mahalaxmi temple, resorts with activities near mahalaxmi temple, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "ashapuri-temple": {
    "id": "ashapuri-temple",
    "name": "Ashapuri Temple",
    "type": "Temple",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Serene Stay Near Ashapuri Temple",
    "heroSubheadline": "After seeking blessings at Ashapuri Temple, retreat to our peaceful 16-acre nature resort for relaxation in our cozy cottages.",
    "seoDescription": "Looking for the perfect resort near Ashapuri Temple? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near ashapuri temple, farm near ashapuri temple, resorts with activities near ashapuri temple, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "waghoba-temple": {
    "id": "waghoba-temple",
    "name": "Waghoba Temple",
    "type": "Temple",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Serene Stay Near Waghoba Temple",
    "heroSubheadline": "After seeking blessings at Waghoba Temple, retreat to our peaceful 16-acre nature resort for relaxation in our cozy cottages.",
    "seoDescription": "Looking for the perfect resort near Waghoba Temple? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near waghoba temple, farm near waghoba temple, resorts with activities near waghoba temple, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "ram-temple": {
    "id": "ram-temple",
    "name": "Ram Temple",
    "type": "Temple",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Serene Stay Near Ram Temple",
    "heroSubheadline": "After seeking blessings at Ram Temple, retreat to our peaceful 16-acre nature resort for relaxation in our cozy cottages.",
    "seoDescription": "Looking for the perfect resort near Ram Temple? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near ram temple, farm near ram temple, resorts with activities near ram temple, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "bhavangad": {
    "id": "bhavangad",
    "name": "Bhavangad",
    "type": "Temple",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Serene Stay Near Bhavangad",
    "heroSubheadline": "After seeking blessings at Bhavangad, retreat to our peaceful 16-acre nature resort for relaxation in our cozy cottages.",
    "seoDescription": "Looking for the perfect resort near Bhavangad? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near bhavangad, farm near bhavangad, resorts with activities near bhavangad, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "tandulwadi-fort": {
    "id": "tandulwadi-fort",
    "name": "Tandulwadi Fort",
    "type": "Fort/Trek",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Adventure & Relax Near Tandulwadi Fort",
    "heroSubheadline": "Conquer the Tandulwadi Fort trek, then unwind at our luxury farm stay with private lakes and the best lawn for events.",
    "seoDescription": "Looking for the perfect resort near Tandulwadi Fort? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near tandulwadi fort, farm near tandulwadi fort, resorts with activities near tandulwadi fort, cozy cottages, best lawn, luxury farm stay, trekking near mumbai, adventure resorts",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "kaldurg-fort": {
    "id": "kaldurg-fort",
    "name": "Kaldurg Fort",
    "type": "Fort/Trek",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Adventure & Relax Near Kaldurg Fort",
    "heroSubheadline": "Conquer the Kaldurg Fort trek, then unwind at our luxury farm stay with private lakes and the best lawn for events.",
    "seoDescription": "Looking for the perfect resort near Kaldurg Fort? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near kaldurg fort, farm near kaldurg fort, resorts with activities near kaldurg fort, cozy cottages, best lawn, luxury farm stay, trekking near mumbai, adventure resorts",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "vasai-fort": {
    "id": "vasai-fort",
    "name": "Vasai Fort",
    "type": "Fort/Trek",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Adventure & Relax Near Vasai Fort",
    "heroSubheadline": "Conquer the Vasai Fort trek, then unwind at our luxury farm stay with private lakes and the best lawn for events.",
    "seoDescription": "Looking for the perfect resort near Vasai Fort? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near vasai fort, farm near vasai fort, resorts with activities near vasai fort, cozy cottages, best lawn, luxury farm stay, trekking near mumbai, adventure resorts",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "asherigad-fort": {
    "id": "asherigad-fort",
    "name": "Asherigad Fort",
    "type": "Fort/Trek",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Adventure & Relax Near Asherigad Fort",
    "heroSubheadline": "Conquer the Asherigad Fort trek, then unwind at our luxury farm stay with private lakes and the best lawn for events.",
    "seoDescription": "Looking for the perfect resort near Asherigad Fort? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near asherigad fort, farm near asherigad fort, resorts with activities near asherigad fort, cozy cottages, best lawn, luxury farm stay, trekking near mumbai, adventure resorts",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "kohoj-fort": {
    "id": "kohoj-fort",
    "name": "Kohoj Fort",
    "type": "Fort/Trek",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Adventure & Relax Near Kohoj Fort",
    "heroSubheadline": "Conquer the Kohoj Fort trek, then unwind at our luxury farm stay with private lakes and the best lawn for events.",
    "seoDescription": "Looking for the perfect resort near Kohoj Fort? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near kohoj fort, farm near kohoj fort, resorts with activities near kohoj fort, cozy cottages, best lawn, luxury farm stay, trekking near mumbai, adventure resorts",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "gambhirgad": {
    "id": "gambhirgad",
    "name": "Gambhirgad",
    "type": "Fort/Trek",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Adventure & Relax Near Gambhirgad",
    "heroSubheadline": "Conquer the Gambhirgad trek, then unwind at our luxury farm stay with private lakes and the best lawn for events.",
    "seoDescription": "Looking for the perfect resort near Gambhirgad? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near gambhirgad, farm near gambhirgad, resorts with activities near gambhirgad, cozy cottages, best lawn, luxury farm stay, trekking near mumbai, adventure resorts",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "kamandurg": {
    "id": "kamandurg",
    "name": "Kamandurg",
    "type": "Fort/Trek",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Adventure & Relax Near Kamandurg",
    "heroSubheadline": "Conquer the Kamandurg trek, then unwind at our luxury farm stay with private lakes and the best lawn for events.",
    "seoDescription": "Looking for the perfect resort near Kamandurg? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near kamandurg, farm near kamandurg, resorts with activities near kamandurg, cozy cottages, best lawn, luxury farm stay, trekking near mumbai, adventure resorts",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "segva": {
    "id": "segva",
    "name": "Segva",
    "type": "Fort/Trek",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Adventure & Relax Near Segva",
    "heroSubheadline": "Conquer the Segva trek, then unwind at our luxury farm stay with private lakes and the best lawn for events.",
    "seoDescription": "Looking for the perfect resort near Segva? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near segva, farm near segva, resorts with activities near segva, cozy cottages, best lawn, luxury farm stay, trekking near mumbai, adventure resorts",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "boisar": {
    "id": "boisar",
    "name": "Boisar",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Boisar",
    "heroSubheadline": "Discover the ultimate nature escape near Boisar. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Boisar? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near boisar, farm near boisar, resorts with activities near boisar, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "dahanu": {
    "id": "dahanu",
    "name": "Dahanu",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Dahanu",
    "heroSubheadline": "Discover the ultimate nature escape near Dahanu. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Dahanu? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near dahanu, farm near dahanu, resorts with activities near dahanu, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "nala-sopara": {
    "id": "nala-sopara",
    "name": "Nala Sopara",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Nala Sopara",
    "heroSubheadline": "Discover the ultimate nature escape near Nala Sopara. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Nala Sopara? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near nala sopara, farm near nala sopara, resorts with activities near nala sopara, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "vasai-road": {
    "id": "vasai-road",
    "name": "Vasai Road",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Vasai Road",
    "heroSubheadline": "Discover the ultimate nature escape near Vasai Road. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Vasai Road? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near vasai road, farm near vasai road, resorts with activities near vasai road, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "bhayandar": {
    "id": "bhayandar",
    "name": "Bhayandar",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Bhayandar",
    "heroSubheadline": "Discover the ultimate nature escape near Bhayandar. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Bhayandar? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near bhayandar, farm near bhayandar, resorts with activities near bhayandar, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "borivali": {
    "id": "borivali",
    "name": "Borivali",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Borivali",
    "heroSubheadline": "Discover the ultimate nature escape near Borivali. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Borivali? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near borivali, farm near borivali, resorts with activities near borivali, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "andheri": {
    "id": "andheri",
    "name": "Andheri",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Andheri",
    "heroSubheadline": "Discover the ultimate nature escape near Andheri. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Andheri? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near andheri, farm near andheri, resorts with activities near andheri, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "bandra": {
    "id": "bandra",
    "name": "Bandra",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Bandra",
    "heroSubheadline": "Discover the ultimate nature escape near Bandra. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Bandra? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near bandra, farm near bandra, resorts with activities near bandra, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "dadar": {
    "id": "dadar",
    "name": "Dadar",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Dadar",
    "heroSubheadline": "Discover the ultimate nature escape near Dadar. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Dadar? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near dadar, farm near dadar, resorts with activities near dadar, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "vangaon": {
    "id": "vangaon",
    "name": "Vangaon",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Vangaon",
    "heroSubheadline": "Discover the ultimate nature escape near Vangaon. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Vangaon? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near vangaon, farm near vangaon, resorts with activities near vangaon, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "vaitarna": {
    "id": "vaitarna",
    "name": "Vaitarna",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Vaitarna",
    "heroSubheadline": "Discover the ultimate nature escape near Vaitarna. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Vaitarna? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near vaitarna, farm near vaitarna, resorts with activities near vaitarna, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "naigaon": {
    "id": "naigaon",
    "name": "Naigaon",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Naigaon",
    "heroSubheadline": "Discover the ultimate nature escape near Naigaon. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Naigaon? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near naigaon, farm near naigaon, resorts with activities near naigaon, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "mira-road": {
    "id": "mira-road",
    "name": "Mira Road",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Mira Road",
    "heroSubheadline": "Discover the ultimate nature escape near Mira Road. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Mira Road? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near mira road, farm near mira road, resorts with activities near mira road, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "dahisar": {
    "id": "dahisar",
    "name": "Dahisar",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Dahisar",
    "heroSubheadline": "Discover the ultimate nature escape near Dahisar. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Dahisar? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near dahisar, farm near dahisar, resorts with activities near dahisar, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "kandivali": {
    "id": "kandivali",
    "name": "Kandivali",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Kandivali",
    "heroSubheadline": "Discover the ultimate nature escape near Kandivali. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Kandivali? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near kandivali, farm near kandivali, resorts with activities near kandivali, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "malad": {
    "id": "malad",
    "name": "Malad",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Malad",
    "heroSubheadline": "Discover the ultimate nature escape near Malad. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Malad? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near malad, farm near malad, resorts with activities near malad, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "goregaon": {
    "id": "goregaon",
    "name": "Goregaon",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Goregaon",
    "heroSubheadline": "Discover the ultimate nature escape near Goregaon. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Goregaon? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near goregaon, farm near goregaon, resorts with activities near goregaon, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "ram-mandir": {
    "id": "ram-mandir",
    "name": "Ram Mandir",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Ram Mandir",
    "heroSubheadline": "Discover the ultimate nature escape near Ram Mandir. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Ram Mandir? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near ram mandir, farm near ram mandir, resorts with activities near ram mandir, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "jogeshwari": {
    "id": "jogeshwari",
    "name": "Jogeshwari",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Jogeshwari",
    "heroSubheadline": "Discover the ultimate nature escape near Jogeshwari. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Jogeshwari? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near jogeshwari, farm near jogeshwari, resorts with activities near jogeshwari, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "vile-parle": {
    "id": "vile-parle",
    "name": "Vile Parle",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Vile Parle",
    "heroSubheadline": "Discover the ultimate nature escape near Vile Parle. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Vile Parle? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near vile parle, farm near vile parle, resorts with activities near vile parle, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "santa-cruz": {
    "id": "santa-cruz",
    "name": "Santa Cruz",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Santa Cruz",
    "heroSubheadline": "Discover the ultimate nature escape near Santa Cruz. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Santa Cruz? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near santa cruz, farm near santa cruz, resorts with activities near santa cruz, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "khar-road": {
    "id": "khar-road",
    "name": "Khar Road",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Khar Road",
    "heroSubheadline": "Discover the ultimate nature escape near Khar Road. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Khar Road? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near khar road, farm near khar road, resorts with activities near khar road, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "mahim": {
    "id": "mahim",
    "name": "Mahim",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Mahim",
    "heroSubheadline": "Discover the ultimate nature escape near Mahim. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Mahim? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near mahim, farm near mahim, resorts with activities near mahim, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  },
  "matunga-road": {
    "id": "matunga-road",
    "name": "Matunga Road",
    "type": "Station",
    "distance": "Varies",
    "driveTime": "Varies",
    "heroHeadline": "Best Resort Near Matunga Road",
    "heroSubheadline": "Discover the ultimate nature escape near Matunga Road. Enjoy our 16 acres of lush greenery, cozy cottages, and private boating.",
    "seoDescription": "Looking for the perfect resort near Matunga Road? Sanjivani Farm offers luxury cozy cottages, a sprawling best lawn, and activities just a short trip away.",
    "keywords": "resorts near matunga road, farm near matunga road, resorts with activities near matunga road, cozy cottages, best lawn, luxury farm stay",
    "attractions": [
      "Sanjivani Farm"
    ]
  }
};
