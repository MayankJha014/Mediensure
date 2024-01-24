"use client";
import { checkUser, logoutUser } from "@/store/Action/auth";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
const Nav = () => {
  const settings = [
    {
      name: "Profile",
      link: "/mediensure/profile",
    },

  ];
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
const {loading,message} = useSelector((state)=>state.auth)
useEffect(() => {

}, [loading,message])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <>
      <div className="h-[10vh] z-50 p-5  bg-white text-sm font-light fixed  w-full  shadow-md items-center justify-between   flex gap-5">
        <div className="flex md:hidden  gap-5">
          <img className="h-7 mt-4" src="/menu.png" alt="" />
          <Link href={"/"}>
            <img className="object-contain h-10 " src="/medi logo.png" alt="" />
          </Link>
        </div>
        <div className=" flex pl-24 items-center gap-4   max-md:hidden  ">
          <Link href={"/"}>
            <img className="object-contain h-10 " src="/medi logo.png" alt="" />
          </Link>
          <Link className="" href={"/mediensure/consultdr"}>
            {" "}
           Book Consultation
          </Link>
          <Link className="" href={"/mediensure/Newdemo4"}>
            {" "}
            Our Network 
          </Link>
          <Link className="" href={"/mediensure/ivfnetwork"}>
            {" "}
            Ivf Network
          </Link>
        </div>
        <div className="flex  items-center justify-center pt-2 pr-14 gap-5 max-md:hidden">
          <Link href={"mediensure/demo2"} className="flex items-center ">
            For Corporate
            <img className="h-5" src="/down.png" alt="" />
          </Link>
          <Link href={"/mediensure/demo"} className=" flex items-center ">
            For Providers
            <img className="h-5" src="/down.png" alt="" />
          </Link>
          {user ? (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <>
                       <Link href={`${setting.link}`}>
                      <MenuItem
                        key={setting.name}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    </Link>
                      <MenuItem
                        key="Logout"
                        onClick={()=>dispatch(logoutUser())}
                      >
                        <Typography textAlign="center">
                         Logout
                        </Typography>
                      </MenuItem>
                    
                    </>
                 
                    
                  ))}
                </Menu>
              </Box>
              <h1 className="font-semibold text-black">Hi, {user?.name}</h1>
            </>
          ) : (
            <Link href={"/mediensure/auth"}>
              {" "}
              <Button variant="outlined" className="h-fit w-fit  ">
                Login/Register{" "}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* @media (min-width: 500px) { 
         <div className='h-16 z-50 p-5  bg-white text-sm font-light fixed  w-full  shadow-md items-center justify-between   flex gap-5'>
         <div  className=' flex pl-24 items-center gap-4     '>
             <img className='object-contain h-10 ' src="/medi logo.png" alt="" />
     <Link className='' href={""}> Find Doctors</Link>
     <Link className='' href={""}> Find Doctors</Link>
     <Link className='' href={""}> Find Doctors</Link>
     <Link className='' href={""}> Find Doctors</Link>
     <Link className='' href={""}> Find Doctors</Link>
             </div>
             <div className='flex  items-center justify-center pt-2 pr-14 gap-5'>
                 <Link href={""} className='flex items-center '>For Corporate 
                 <img className='h-5' src="/down.png" alt="" />
                 </Link>
                 <Link href={""} className=' flex items-center '>For Providers
                 <img className='h-5' src="/down.png" alt="" />
                 </Link>
     <Link href={"/mediensure/auth"}>        <Button variant='outlined' className='h-fit w-fit '>Login/Register  </Button></Link>
     
             </div>
         </div>
    
    } */}
    </>
  );
};

export default Nav;
