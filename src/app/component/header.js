import React from 'react';

const Header = () => {
  return (
    <header className='shadow-md font-[Roboto]'>
            <section className="py-1 bg-[#ffffff] text-[#999999] px-5 flex justify-end items-center">
                <div className="flex items-center">
                  <button className="mr-4">Help</button>
                  <button className="mr-4">Order & Return</button>
                  <button>Hi, John</button>
                </div>
            </section>

            <div className='flex flex-wrap items-center justify-between gap-4 px-10 py-3 relative bg-white min-h-[70px]'>
              <a href="javascript:void(0)" className="font-bold text-3xl text-[#000]">ECOMMERCE</a>  <div className="flex items-center space-x-4">
              <button className="px-3 py-2 font-bold">Categories</button>
              <button className="px-3 py-2 font-bold">Sale</button>
              <button className="px-3 py-2 font-bold">Clearance</button>
              <button className="px-3 py-2 font-bold">New Stock</button>
              <button className="px-3 py-2 font-bold">Trending</button>
            </div>

            <div className="flex items-center space-x-4">  
              <svg className="w-6 h-6 text-black " fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
            </div>
          </div>

          <section className="py-1 bg-[#f4f4f4] text-black text-center px-10">
            <div className="flex justify-center items-center">
              <button className="px-3 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
              </button>
              <p className="text-sm ml-4">Get 10% off on business sign up</p>
              <button className="px-3 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
              </button>
            </div>
          </section>       

  </header>
  );
};

export default Header;