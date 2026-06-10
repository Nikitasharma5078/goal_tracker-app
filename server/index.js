app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://goal-tracker-app.vercel.app'
  ]
}));