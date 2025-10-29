interface StatsCardProps {
    title: string;
    value: string | number;
  }
  
  export default function StatsCard({ title, value }: StatsCardProps) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-lg flex flex-col items-start">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-2xl font-bold text-red-800 mt-2">{value}</span>
      </div>
    );
  }
  