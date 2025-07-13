'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
type User = {
    role?: string;
    
  };
const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
const [showFinance, setShowFinance] = useState(false);
  

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/auth/logout', {}, { withCredentials: true });
      const savedEmail = localStorage.getItem('savedEmail');

      localStorage.clear();
      if(savedEmail){
        localStorage.setItem('savedEmail', savedEmail);
      }
      sessionStorage.clear();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


    useEffect(()=>{
    axios.get("http://localhost:3001/auth/profile", {
      withCredentials: true,
    })
    .then((res)=>{
      setUser(res.data);
      alert(JSON.stringify(res.data)); 
      
    })
    .catch((err)=>{
      setError("Unable to fetch user");
      console.error(err);
    });

  },[]);


  const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Projects', href: '/projects' },
    { name: 'Notice', href: '/post' },
    { name: 'Courses', href: '/courses' },
    { name: 'Instructors', href: '/instructors' },
    { name: 'Students', href: '/students' },
  
  ]
    if (user?.role === 'admin') {
  links.push({ name: 'Users', href: '/users' });

    
    };




useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowConfirm(false); 
    }
  };

  if (showConfirm) {
    window.addEventListener('keydown', handleEsc);
  }

  return () => {
    window.removeEventListener('keydown', handleEsc);
  };
}, [showConfirm]);


  return (
    <>
      <aside className="fixed min-h-screen left-0 top-0 w-64 bg-gradient-to-b from-blue-100 via-blue-50 to-white text-gray-800 p-6 shadow-md border-r border-blue-200">
        <h2 className="text-xl font-bold mb-6">Manager Panel</h2>

        <nav className="space-y-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`block px-3 py-2 rounded-md font-medium transition ${
                  pathname === link.href
                    ? 'bg-blue-200 text-blue-900'
                    : 'hover:bg-blue-100 hover:text-blue-700'
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}

  
          <div className="relative">
            <button
              onClick={() => setShowEvents(!showEvents)}
              className={`w-full text-left px-3 py-2 rounded-md font-medium transition flex justify-between items-center ${
                pathname.startsWith('/events')
                  ? 'bg-blue-200 text-blue-900'
                  : 'hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              Events
              
              
            </button>

            {showEvents && (
              <div className="ml-4 mt-1 space-y-1">
                <Link href="/events">
                  <span
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                      pathname === '/events'
                        ? 'bg-blue-100 text-blue-900'
                        : 'hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    View Events
                  </span>
                </Link>
                <Link href="/events/create">
                  <span
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                      pathname === '/events/create'
                        ? 'bg-blue-100 text-blue-900'
                        : 'hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    Create Events
                  </span>
                </Link>
              </div>
            )}
          </div>



          
          <div className="relative">
            <button
              onClick={() => setShowFinance(!showFinance)}
              className={`w-full text-left px-3 py-2 rounded-md font-medium transition flex justify-between items-center ${
                pathname.startsWith('/finance')
                  ? 'bg-blue-200 text-blue-900'
                  : 'hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              Finance
              
            </button>

            {showFinance && (
              <div className="ml-4 mt-1 space-y-1">
                <Link href="/finance/transactions">
                  <span
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                      pathname === '/finance'
                        ? 'bg-blue-100 text-blue-900'
                        : 'hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    Transactions
                  </span>
                </Link>
                <Link href="/finance/expense">
                  <span
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                      pathname === '/events/create'
                        ? 'bg-blue-100 text-blue-900'
                        : 'hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    Expense
                  </span>
                </Link>
                <Link href="/finance/monthly">
                  <span
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                      pathname === '/events/create'
                        ? 'bg-blue-100 text-blue-900'
                        : 'hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                  Monthly Income
                  </span>
                </Link>
              </div>
            )}
          </div>




        
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full text-left px-3 py-2  border-red rounded-md font-medium text-red-600 hover:bg-red-100 transition"
          >
            Logout
          </button>
        </nav>
      </aside>
      {showConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4 text-black">Are you sure?</h2>
            <p className="mb-6 text-gray-600">Do you really want to logout?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
