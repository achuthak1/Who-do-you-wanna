# Who Do You Wanna?

A fun Next.js web app to discover your favorite Indian actress or actor through a bracket-style voting system.

## Features
- Choose gender: Woman (Actresses) or Man (Actors)
- Vote between pairs of top Indian celebrities (South Indian + Bollywood)
- Beautiful glassmorphism UI with animated gradient background
- After 10 selections, reveals your all-time favorite
- Vote again feature to find other favorites

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```
2. Run the development server:
   ```
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages
- `/` - Gender selection (Woman or Man)
- `/actresses` - Vote for your favorite actress
- `/actors` - Vote for your favorite actor

## Celebrities Featured

### Actresses
- **South Indian:** Nayanthara, Samantha Ruth Prabhu, Anushka Shetty, Kajal Aggarwal, Tamannaah Bhatia, Pooja Hegde, Rashmika Mandanna, Amala Paul
- **Bollywood:** Alia Bhatt, Deepika Padukone, Vidya Balan, Shraddha Kapoor, Katrina Kaif, Priyanka Chopra, Aishwarya Rai, Mallika Sherawat

### Actors
- **South Indian:** Rajinikanth, Kamal Haasan, Prabhas, Mahesh Babu, Ram Charan, Yash, Allu Arjun, Suriya, Chiyaan Vikram, Dhanush
- **Bollywood:** Ranveer Singh, Hrithik Roshan, Akshay Kumar, Shah Rukh Khan, Salman Khan, Aamir Khan

## How It Works
1. Select your gender on the home page
2. You'll be presented with two celebrities at a time
3. Click on your preferred celebrity
4. The other is replaced with a new one
5. After 10 selections, your favorite is revealed!
6. Click "Vote Again" to start over

## Technologies
- Next.js with React
- TypeScript
- CSS Modules with glassmorphism design
- Vercel for deployment
