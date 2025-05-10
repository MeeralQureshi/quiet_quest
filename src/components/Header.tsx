
function Header() {
    return (
      <header className="bg-gray-800 p-4 flex items-center justify-between">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
          {/* Logo Icon (e.g., a moon or cute icon) */}
          <img 
            src="/images/moon_logo.jpeg" 
            alt="Quiet Quest Logo" 
            style={{ width: '80px', height: '80px' }}
            className="object-contain"
        />
          <h1 className="text-gray-100 text-xl font-bold font-baloobar">NapNest</h1>
        </div>
  
        {/* Profile Icon */}
        <div className="flex items-center space-x-3">
          {/* Profile Icon (e.g., user avatar) */}
          <img 
            src="/images/profile-icon.png" 
            alt="Quiet Quest Logo" 
            style={{ width: '50px', height: '50px' }}
            className="object-contain"
        />
        </div>
      </header>
    );
  }
  
  export default Header;