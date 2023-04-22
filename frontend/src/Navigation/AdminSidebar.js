import React, { useState, useEffect } from "react"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FaBalanceScale, FaShoppingCart, FaDonate, FaSyncAlt, FaMoneyBillAlt, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillHome,AiFillDashboard } from "react-icons/ai";
import { FaUserAlt,FaHandHoldingUsd,FaHandHoldingWater,FaHandHolding } from "react-icons/fa";
import { MdVerifiedUser,MdVerified } from "react-icons/md";
export default function sidebar() {

    return (
        <div >
            <SideNav style={{
                background: '#0E1E2B', width: '20vh'
            }}
            >
                <div style={{ paddingTop: '2vh', paddingLeft: '1vh' }}><h5 style={{color:'white'}}><br/><br/><br/><br/><br/><br/>       Aqua-Assist</h5>
                </div>


                <div style={{ paddingTop: '3vh', paddingLeft: '2vh' }}>

                <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/admindashboard",
                        }}
                    >
                        <NavItem eventKey="budget">


                            <NavIcon>
                                <AiFillDashboard style={{ width: '1.75em' }} /> Dashboard
                            </NavIcon>

                        </NavItem>
                    </Link><br />

                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/home",
                        }}
                    >
                        <NavItem eventKey="budget">


                            <NavIcon>
                                <AiFillHome style={{ width: '1.75em' }} /> Home
                            </NavIcon>

                        </NavItem>
                    </Link><br />
                    
                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/issue",
                        }}
                    >
                        <NavItem eventKey="refund">
                            <NavIcon>
                                <FaHandHoldingWater style={{ width: '1.75em' }} /> Issue
                            </NavIcon>


                        </NavItem>
                    </Link><br />



                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/campaign",
                        }}
                    >
                        <NavItem eventKey="Newp">
                            <NavIcon>
                                <FaHandHolding style={{ width: '1.75em' }} />Campagin

                            </NavIcon>


                        </NavItem>
                    </Link><br />

                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/verifyissue",
                        }}
                    >
                        <NavItem eventKey="refund">
                            <NavIcon>
                                <MdVerifiedUser style={{ width: '1.75em' }} /> Verify Issue
                            </NavIcon>


                        </NavItem>
                    </Link><br />



                    <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to={{
                            pathname: "/verifyuser",
                        }}
                    >
                        <NavItem eventKey="Newp">
                            <NavIcon>
                                <MdVerified style={{ width: '1.75em' }} />Verify User

                            </NavIcon>


                        </NavItem>
                    </Link><br />

                   

                
                </div>
            </SideNav>

        </div>
    );
}
