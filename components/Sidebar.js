import Link from 'next/link';
    import { useRouter } from 'next/router';

    export default function Sidebar({ clubName }) {
      const router = useRouter();
      const menuItems = [
        { name: 'Dashboard', path: '/', icon: '🏠' },
        { name: 'Members', path: '/members', icon: '👥' },
        { name: 'Transactions', path: '/transactions', icon: '💰' },
        { name: 'Settings', path: '/settings', icon: '⚙️' },
      ];

      return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
          <h1 className="text-2xl font-bold mb-6 text-blue-500">{clubName || "NAME"}</h1>
          <nav className="flex-grow">
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.path}
                  className={`mb-2 rounded transition-colors duration-200 ${
                    router.pathname === item.path
                      ? 'bg-gray-700'
                      : 'hover:bg-gray-600'
                  }`}
                >
                  <Link href={item.path}>
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-200 mt-4">
            Logout
          </button>
        </aside>
      );
    }
