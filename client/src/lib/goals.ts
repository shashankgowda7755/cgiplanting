export interface Goal {
  id: number;
  title: string;
  description: string;
  color: string;
  icon?: string;
}

export const SDGs: Goal[] = [
  { id: 1, title: "No Poverty", description: "End poverty in all its forms everywhere.", color: "#E5243B" },
  { id: 2, title: "Zero Hunger", description: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.", color: "#DDA63A" },
  { id: 3, title: "Good Health and Well-being", description: "Ensure healthy lives and promote well-being for all at all ages.", color: "#4C9F38" },
  { id: 4, title: "Quality Education", description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.", color: "#C5192D" },
  { id: 5, title: "Gender Equality", description: "Achieve gender equality and empower all women and girls.", color: "#FF3A21" },
  { id: 6, title: "Clean Water and Sanitation", description: "Ensure availability and sustainable management of water and sanitation for all.", color: "#26BDE2" },
  { id: 7, title: "Affordable and Clean Energy", description: "Ensure access to affordable, reliable, sustainable and modern energy for all.", color: "#FCC30B" },
  { id: 8, title: "Decent Work and Economic Growth", description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.", color: "#A21942" },
  { id: 9, title: "Industry, Innovation and Infrastructure", description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.", color: "#FD6925" },
  { id: 10, title: "Reduced Inequalities", description: "Reduce inequality within and among countries.", color: "#DD1367" },
  { id: 11, title: "Sustainable Cities and Communities", description: "Make cities and human settlements inclusive, safe, resilient and sustainable.", color: "#FD9D24" },
  { id: 12, title: "Responsible Consumption and Production", description: "Ensure sustainable consumption and production patterns.", color: "#BF8B2E" },
  { id: 13, title: "Climate Action", description: "Take urgent action to combat climate change and its impacts.", color: "#3F7E44" },
  { id: 14, title: "Life Below Water", description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.", color: "#0A97D9" },
  { id: 15, title: "Life on Land", description: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.", color: "#56C02B" },
  { id: 16, title: "Peace, Justice and Strong Institutions", description: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.", color: "#00689D" },
  { id: 17, title: "Partnerships for the Goals", description: "Strengthen the means of implementation and revitalize the global partnership for sustainable development.", color: "#19486A" },
];
