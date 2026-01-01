import React from 'react';

// Rebranded to Browser Frame styling
export const Window: React.FC<{
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  isActive?: boolean;
}> = ({ title, children, icon, onClose, className = "" }) => {
  return (
    <div className={`border-4 border-black bg-white flex flex-col relative rounded-lg ${className}`} style={{ boxShadow: '10px 10px 0px rgba(0,0,0,0.2)' }}>
      {/* Browser Chrome (Top Bar) */}
      <div className="border-b-4 border-black p-2 bg-gray-100 flex flex-col gap-2">
        {/* Tab Area */}
        <div className="flex items-center gap-2">
            <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full border-2 border-black bg-red-400"></div>
                <div className="w-3 h-3 rounded-full border-2 border-black bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full border-2 border-black bg-green-400"></div>
            </div>
            
            {/* Active Tab */}
            <div className="bg-white border-2 border-black px-4 py-1 rounded-t-lg -mb-3 relative z-10 font-bold flex items-center gap-2">
                 <span>{icon}</span>
                 <span>{title}</span>
                 <span className="ml-2 text-xs cursor-pointer hover:text-red-600">x</span>
            </div>
        </div>
      </div>
      
      {/* Address Bar Area */}
      <div className="border-b-4 border-black bg-white p-2 flex gap-2 items-center">
        <div className="flex gap-2 text-xl font-bold">
            <button className="hover:text-gray-500">←</button>
            <button className="hover:text-gray-500">→</button>
            <button className="hover:text-gray-500">↻</button>
        </div>
        <div className="flex-1 border-2 border-black rounded-full px-4 py-1 bg-gray-50 font-mono text-sm flex items-center gap-2 text-gray-500">
            <span>🔒</span>
            <span>https://www.isekai-connect.snafu/adventure</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col relative bg-white">
        {children}
      </div>
    </div>
  );
};

export const Panel: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'in' | 'out';
}> = ({ children, className = "" }) => {
  return (
    <div className={`border-2 border-black p-2 ${className}`}>
      {children}
    </div>
  );
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: 'sm' | 'md' }> = ({ 
  children, 
  className = "", 
  size = 'md',
  ...props 
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0 text-sm' : 'px-4 py-2 text-lg';
  return (
    <button 
      className={`
        border-2 border-black 
        bg-blue-400 text-white
        hover:bg-blue-500
        active:bg-black
        font-bold rounded-full
        transform transition-transform
        active:scale-95
        ${sizeClasses} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export const ProgressBar: React.FC<{ value: number; max: number; color?: string }> = ({ value, max, color = "bg-black" }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="h-4 border-2 border-black w-full relative bg-gray-100 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} absolute top-0 left-0 transition-all duration-300`} 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};