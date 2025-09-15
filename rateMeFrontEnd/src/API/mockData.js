// utils/mockData.js

// Generate random data for demonstration
export const generateMockData = () => {
  const businessTypes = ['Restaurant', 'Cafe', 'Hotel', 'Snack Bar', 'Bakery'];

  // Review data
  const reviews = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    customerName: ['Sarah Johnson', 'Mike Chen', 'Emily Davis', 'Alex Rodriguez', 'Maria Garcia', 'James Wilson', 'Lisa Taylor', 'David Brown'][i % 8],
    rating: Math.floor(Math.random() * 5) + 1,
    comment: [
      'Amazing experience! Will definitely come back.',
      'Good service but could be improved.',
      'The food was excellent and the staff was very friendly.',
      'Average experience, nothing special.',
      'Highly recommended! Best in town.',
      'Disappointing visit, expected better.',
      'Great atmosphere and delicious food.',
      'Quick service and reasonable prices.'
    ][i % 8],
    itemName: ['Pizza', 'Coffee', 'Burger', 'Cake', 'Pasta', 'Tea', 'Salad', 'Sandwich'][i % 8],
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    businessType: businessTypes[i % 5],
    verified: Math.random() > 0.3
  }));

  // Analytics data
  const analytics = {
    totalReviews: reviews.length,
    averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    ratingDistribution: [1, 2, 3, 4, 5].map(r => ({
      rating: r,
      count: reviews.filter(v => v.rating === r).length,
      percentage: Math.round((reviews.filter(v => v.rating === r).length / reviews.length) * 100)
    })),
    monthlyData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => ({
      month,
      reviews: Math.floor(Math.random() * 20) + 10,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1)
    })),
    weeklyTrends: ['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(week => ({
      week,
      reviews: Math.floor(Math.random() * 15) + 5,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1)
    })),
    dailyTrends: Array.from({ length: 7 }, (_, i) => ({
      day: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][i],
      reviews: Math.floor(Math.random() * 20) + 5
    })),
    newCustomers: Math.floor(Math.random() * 50) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
    ageGroupsDistribution: [
      { group: '18-24', percentage: 25 },
      { group: '25-34', percentage: 35 },
      { group: '35-44', percentage: 20 },
      { group: '45+', percentage: 20 },
    ]
  };

  const qrCodes = [
    { id: 1, name: 'Main Dining Area', scans: 245, createdAt: '2024-01-15' },
    { id: 2, name: 'Takeaway Counter', scans: 178, createdAt: '2024-02-10' },
    { id: 3, name: 'Outdoor Seating', scans: 132, createdAt: '2024-03-05' }
  ];

  const businessProfile = {
    name: 'Delicious Bites',
    type: 'Restaurant',
    email: 'contact@deliciousbites.com',
    subscription: { plan: 'Premium', status: 'active', expiryDate: '2024-12-31' },
    wifi: { name: 'DeliciousBites_Guest', password: 'EnjoyYourMeal2024' },
    socialLinks: {
      website: 'https://deliciousbites.com',
      facebook: 'https://facebook.com/deliciousbites',
      instagram: 'https://instagram.com/deliciousbites',
      twitter: 'https://twitter.com/deliciousbites'
    }
  };

  return { reviews, analytics, qrCodes, businessProfile };
};

// API simulation functions
export const mockAPI = {
  getDashboardData: () => new Promise(resolve => setTimeout(() => resolve(generateMockData()), 800)),

  getReviews: (filters = {}) => new Promise(resolve => {
    setTimeout(() => {
      let filtered = generateMockData().reviews;

      if (filters.rating && filters.rating !== 'all') {
        filtered = filtered.filter(r => r.rating === parseInt(filters.rating));
      }
      if (filters.businessType && filters.businessType !== 'all') {
        filtered = filtered.filter(r => r.businessType === filters.businessType);
      }
      if (filters.search) {
        const term = filters.search.toLowerCase();
        filtered = filtered.filter(r =>
          (r.itemName?.toLowerCase().includes(term)) || r.comment.toLowerCase().includes(term)
        );
      }

      resolve(filtered);
    }, 600);
  }),

  updateBusinessProfile: (updates) => new Promise(resolve => {
    setTimeout(() => { console.log('Profile updated:', updates); resolve({ success: true, message: 'Profile updated successfully' }); }, 500);
  }),

  getQRCodes: () => new Promise(resolve => setTimeout(() => resolve(generateMockData().qrCodes), 600)),

  generateQRCode: (name) => new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: Math.floor(Math.random() * 1000)+100, name: name||`QR Code ${Math.floor(Math.random()*1000)}`, scans:0, createdAt: new Date().toISOString().split('T')[0] });
    }, 800);
  }),

  deleteQRCode: (id) => new Promise(resolve => setTimeout(() => resolve({ success:true, message:'QR code deleted successfully' }),500)),

  downloadQRCode: (id) => new Promise(resolve => setTimeout(() => resolve({ success:true, message:'QR code downloaded' }),300)),
  useResetQRCode: (id) => new Promise(resolve => setTimeout(() => resolve({ success:true, message:'QR code counter reset' }),500))
};

