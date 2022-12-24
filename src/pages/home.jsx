/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { StylesDashboard } from '@/components/Shared/StylesDashboard'
import {
  loginEth,
  loginGoogle,
  loginGuest,
  loginGuestLocal,
  signOut,
} from '@/content-landing-page/LoginContentGate/GateMethods'
import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
import Head from 'next/head'
import { useSnapshot } from 'valtio'

export default function Page() {
  let gate = useSnapshot(GateState)
  return (
    <div>
      <StylesDashboard></StylesDashboard>

      <div>
        <aside className='fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 ml-4 overflow-y-auto antialiased bg-white border-0 shadow-none max-w-62.5 ease-nav-brand z-990 -translate-x-full rounded-2xl transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent'>
          <div className='h-19.5'>
            <i
              className='absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden'
              sidenav-close
            />
            <a
              className='block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700'
              href='../pages/dashboard.html'
              target='_blank'
            >
              <img
                src='../assets/img/logo-ct.png'
                className='inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8'
                alt='main_logo'
              />
              <span className='ml-1 font-semibold transition-all duration-200 ease-nav-brand'>
                Soft UI Dashboard
              </span>
            </a>
          </div>
          <hr className='h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent' />
          {/* change h-sidenav-no-pro to h-sidenav when pro is up */}
          <div className='items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full'>
            <ul className='flex flex-col pl-0 mb-0'>
              <li className='w-full mt-0.5'>
                <a
                  className='flex items-center px-4 mx-4 my-0 text-sm py-2.7 ease-nav-brand whitespace-nowrap transition-colors'
                  href='../pages/dashboard.html'
                >
                  <div className='flex items-center justify-center w-8 h-8 mr-2 text-center bg-white bg-center rounded-lg shadow-soft-2xl stroke-0 xl:p-2.5'>
                    <svg
                      width='12px'
                      height='12px'
                      viewBox='0 0 45 40'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                    >
                      <title>shop</title>
                      <g
                        stroke='none'
                        strokeWidth={1}
                        fill='none'
                        fillRule='evenodd'
                      >
                        <g
                          transform='translate(-1716.000000, -439.000000)'
                          fill='#FFFFFF'
                          fillRule='nonzero'
                        >
                          <g transform='translate(1716.000000, 291.000000)'>
                            <g transform='translate(0.000000, 148.000000)'>
                              <path
                                className='fill-slate-800 opacity-60'
                                d='M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z'
                              />
                              <path
                                className='fill-slate-800'
                                d='M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z'
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className='ml-1 opacity-100 pointer-events-none duration-300 ease-soft'>
                    Dashboard
                  </span>
                </a>
              </li>
              <li className='w-full mt-0.5'>
                <a
                  className='flex items-center px-4 mx-4 my-0 text-sm py-2.7 ease-nav-brand whitespace-nowrap transition-colors'
                  href='../pages/tables.html'
                >
                  <div className='flex items-center justify-center w-8 h-8 mr-2 text-center bg-white bg-center rounded-lg shadow-soft-2xl stroke-0 xl:p-2.5'>
                    <svg
                      width='12px'
                      height='12px'
                      viewBox='0 0 42 42'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                    >
                      <title>office</title>
                      <g
                        stroke='none'
                        strokeWidth={1}
                        fill='none'
                        fillRule='evenodd'
                      >
                        <g
                          transform='translate(-1869.000000, -293.000000)'
                          fill='#FFFFFF'
                          fillRule='nonzero'
                        >
                          <g transform='translate(1716.000000, 291.000000)'>
                            <g transform='translate(153.000000, 2.000000)'>
                              <path
                                className='fill-slate-800 opacity-60'
                                d='M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z'
                              />
                              <path
                                className='fill-slate-800'
                                d='M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z'
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className='ml-1 opacity-100 pointer-events-none duration-300 ease-soft'>
                    Tables
                  </span>
                </a>
              </li>
              <li className='w-full mt-0.5'>
                <a
                  className='flex items-center px-4 mx-4 my-0 text-sm py-2.7 ease-nav-brand whitespace-nowrap transition-colors'
                  href='../pages/billing.html'
                >
                  <div className='flex items-center justify-center w-8 h-8 mr-2 text-center bg-white bg-center rounded-lg fill-current shadow-soft-2xl stroke-0 xl:p-2.5'>
                    <svg
                      width='12px'
                      height='12px'
                      viewBox='0 0 43 36'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                    >
                      <title>credit-card</title>
                      <g
                        stroke='none'
                        strokeWidth={1}
                        fill='none'
                        fillRule='evenodd'
                      >
                        <g
                          transform='translate(-2169.000000, -745.000000)'
                          fill='#FFFFFF'
                          fillRule='nonzero'
                        >
                          <g transform='translate(1716.000000, 291.000000)'>
                            <g transform='translate(453.000000, 454.000000)'>
                              <path
                                className='fill-slate-800 opacity-60'
                                d='M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z'
                              />
                              <path
                                className='fill-slate-800'
                                d='M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z'
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className='ml-1 opacity-100 pointer-events-none duration-300 ease-soft'>
                    Billing
                  </span>
                </a>
              </li>
              <li className='w-full mt-0.5'>
                <a
                  className='flex items-center px-4 mx-4 my-0 text-sm py-2.7 ease-nav-brand whitespace-nowrap transition-colors'
                  href='../pages/virtual-reality.html'
                >
                  <div className='flex items-center justify-center w-8 h-8 mr-2 text-center bg-white bg-center rounded-lg shadow-soft-2xl stroke-0 xl:p-2.5'>
                    <svg
                      width='12px'
                      height='12px'
                      viewBox='0 0 42 42'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                    >
                      <title>box-3d-50</title>
                      <g
                        stroke='none'
                        strokeWidth={1}
                        fill='none'
                        fillRule='evenodd'
                      >
                        <g
                          transform='translate(-2319.000000, -291.000000)'
                          fill='#FFFFFF'
                          fillRule='nonzero'
                        >
                          <g transform='translate(1716.000000, 291.000000)'>
                            <g transform='translate(603.000000, 0.000000)'>
                              <path
                                className='fill-slate-800'
                                d='M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z'
                              />
                              <path
                                className='fill-slate-800 opacity-60'
                                d='M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z'
                              />
                              <path
                                className='fill-slate-800 opacity-60'
                                d='M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z'
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className='ml-1 opacity-100 pointer-events-none duration-300 ease-soft'>
                    Virtual Reality
                  </span>
                </a>
              </li>
              <li className='w-full mt-0.5'>
                <a
                  className='flex items-center px-4 mx-4 my-0 text-sm py-2.7 ease-nav-brand whitespace-nowrap transition-colors'
                  href='../pages/rtl.html'
                >
                  <div className='flex items-center justify-center w-8 h-8 mr-2 text-center bg-white bg-center rounded-lg shadow-soft-2xl stroke-0 xl:p-2.5'>
                    <svg
                      width='12px'
                      height='12px'
                      viewBox='0 0 40 40'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                    >
                      <title>settings</title>
                      <g
                        stroke='none'
                        strokeWidth={1}
                        fill='none'
                        fillRule='evenodd'
                      >
                        <g
                          transform='translate(-2020.000000, -442.000000)'
                          fill='#FFFFFF'
                          fillRule='nonzero'
                        >
                          <g transform='translate(1716.000000, 291.000000)'>
                            <g transform='translate(304.000000, 151.000000)'>
                              <polygon
                                className='fill-slate-800 opacity-60'
                                points='18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667'
                              />
                              <path
                                className='fill-slate-800 opacity-60'
                                d='M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z'
                              />
                              <path
                                className='fill-slate-800'
                                d='M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z'
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className='ml-1 opacity-100 pointer-events-none duration-300 ease-soft'>
                    RTL
                  </span>
                </a>
              </li>
              <li className='w-full mt-4'>
                <h6 className='pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60'>
                  Account pages
                </h6>
              </li>
              <li className='w-full mt-0.5'>
                <a
                  className='flex items-center px-4 mx-4 my-0 text-sm font-semibold bg-white rounded-lg py-2.7 shadow-soft-xl ease-nav-brand whitespace-nowrap text-slate-700 transition-colors'
                  href='../pages/profile.html'
                >
                  <div className='flex items-center justify-center w-8 h-8 mr-2 text-center bg-white bg-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl stroke-0 xl:p-2.5'>
                    <svg
                      width='12px'
                      height='12px'
                      viewBox='0 0 46 42'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                    >
                      <title>customer-support</title>
                      <g
                        stroke='none'
                        strokeWidth={1}
                        fill='none'
                        fillRule='evenodd'
                      >
                        <g
                          transform='translate(-1717.000000, -291.000000)'
                          fill='#FFFFFF'
                          fillRule='nonzero'
                        >
                          <g transform='translate(1716.000000, 291.000000)'>
                            <g transform='translate(1.000000, 0.000000)'>
                              <path
                                className='opacity-60'
                                d='M45,0 L26,0 C25.447,0 25,0.447 25,1 L25,20 C25,20.379 25.214,20.725 25.553,20.895 C25.694,20.965 25.848,21 26,21 C26.212,21 26.424,20.933 26.6,20.8 L34.333,15 L45,15 C45.553,15 46,14.553 46,14 L46,1 C46,0.447 45.553,0 45,0 Z'
                              />
                              <path
                                className
                                d='M22.883,32.86 C20.761,32.012 17.324,31 13,31 C8.676,31 5.239,32.012 3.116,32.86 C1.224,33.619 0,35.438 0,37.494 L0,41 C0,41.553 0.447,42 1,42 L25,42 C25.553,42 26,41.553 26,41 L26,37.494 C26,35.438 24.776,33.619 22.883,32.86 Z'
                              />
                              <path
                                className
                                d='M13,28 C17.432,28 21,22.529 21,18 C21,13.589 17.411,10 13,10 C8.589,10 5,13.589 5,18 C5,22.529 8.568,28 13,28 Z'
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className='ml-1 opacity-100 pointer-events-none duration-300 ease-soft'>
                    Profile
                  </span>
                </a>
              </li>
              <li className='w-full mt-0.5'>
                <a
                  className='flex items-center px-4 mx-4 my-0 text-sm py-2.7 ease-nav-brand whitespace-nowrap transition-colors'
                  href='../pages/sign-in.html'
                >
                  <div className='flex items-center justify-center w-8 h-8 mr-2 text-center bg-white bg-center rounded-lg shadow-soft-2xl stroke-0 xl:p-2.5'>
                    <svg
                      width='12px'
                      height='12px'
                      viewBox='0 0 40 44'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                    >
                      <title>document</title>
                      <g
                        stroke='none'
                        strokeWidth={1}
                        fill='none'
                        fillRule='evenodd'
                      >
                        <g
                          transform='translate(-1870.000000, -591.000000)'
                          fill='#FFFFFF'
                          fillRule='nonzero'
                        >
                          <g transform='translate(1716.000000, 291.000000)'>
                            <g transform='translate(154.000000, 300.000000)'>
                              <path
                                className='fill-slate-800 opacity-60'
                                d='M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z'
                              />
                              <path
                                className='fill-slate-800'
                                d='M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z'
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className='ml-1 opacity-100 pointer-events-none duration-300 ease-soft'>
                    Sign In
                  </span>
                </a>
              </li>
              <li className='w-full mt-0.5'>
                <a
                  className='flex items-center px-4 mx-4 my-0 text-sm py-2.7 ease-nav-brand whitespace-nowrap transition-colors'
                  href='../pages/sign-up.html'
                >
                  <div className='flex items-center justify-center w-8 h-8 mr-2 text-center bg-white bg-center rounded-lg shadow-soft-2xl stroke-0 xl:p-2.5'>
                    <svg
                      width='12px'
                      height='20px'
                      viewBox='0 0 40 40'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                    >
                      <title>spaceship</title>
                      <g
                        stroke='none'
                        strokeWidth={1}
                        fill='none'
                        fillRule='evenodd'
                      >
                        <g
                          transform='translate(-1720.000000, -592.000000)'
                          fill='#FFFFFF'
                          fillRule='nonzero'
                        >
                          <g transform='translate(1716.000000, 291.000000)'>
                            <g transform='translate(4.000000, 301.000000)'>
                              <path
                                className='fill-slate-800'
                                d='M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z'
                              />
                              <path
                                className='fill-slate-800 opacity-60'
                                d='M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z'
                              />
                              <path
                                className='fill-slate-800 opacity-60'
                                d='M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z'
                              />
                              <path
                                className='fill-slate-800 opacity-60'
                                d='M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z'
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className='ml-1 opacity-100 pointer-events-none duration-300 ease-soft'>
                    Sign Up
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <div className='relative h-full max-h-screen ease-soft-in-out xl:ml-68.5 bg-gray-50 transition-all duration-200'>
          <nav
            className='absolute z-20 flex flex-wrap items-center justify-between w-full px-6 py-2 text-white shadow-none transition-all duration-250 ease-soft-in lg:flex-nowrap lg:justify-start'
            navbar-profile
            navbar-scroll='true'
          >
            <div className='flex items-center justify-between w-full px-6 py-1 mx-auto flex-wrap-inherit'>
              <nav>
                {/* breadcrumb */}
                <ol className='flex flex-wrap pt-1 pl-2 pr-4 mr-12 bg-transparent rounded-lg sm:mr-16'>
                  <li className='text-sm leading-normal'>
                    <a className='opacity-50' href='javascript:;'>
                      Pages
                    </a>
                  </li>
                  <li
                    className="pl-2 text-sm leading-normal capitalize before:float-left before:pr-2 before:content-['/']"
                    aria-current='page'
                  >
                    Profile
                  </li>
                </ol>
                <h6 className='mb-2 ml-2 font-bold text-white capitalize'>
                  Profile
                </h6>
              </nav>
              <div className='flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto'>
                <div className='flex items-center md:ml-auto md:pr-4'>
                  <div className='relative flex flex-wrap items-stretch w-full rounded-lg transition-all ease-soft'>
                    <span className='absolute z-50 flex items-center h-full py-2 -ml-px text-sm font-normal text-center bg-transparent border border-r-0 border-transparent rounded-lg rounded-tr-none rounded-br-none ease-soft leading-5.6 whitespace-nowrap px-2.5 text-slate-500 transition-all'>
                      <i className='fas fa-search' aria-hidden='true' />
                    </span>
                    <input
                      type='text'
                      className='relative flex-auto block min-w-0 py-2 pr-3 -ml-px text-sm text-gray-700 bg-white border border-gray-300 border-solid rounded-lg pl-8.75 focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 bg-clip-padding transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow'
                      placeholder='Type here...'
                    />
                  </div>
                </div>
                <ul className='flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full'>
                  {/* online builder btn  */}
                  {/* <li class="flex items-center">
                <a class="inline-block px-8 py-2 mb-0 mr-4 font-bold text-center text-white uppercase align-middle transition-all border border-solid rounded-lg shadow-none cursor-pointer leading-pro border-white/75 bg-white/10 ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft hover:border-white hover:bg-transparent hover:text-white hover:opacity-75 hover:shadow-none active:bg-white active:text-black active:hover:bg-transparent active:hover:text-white" target="_blank" href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard&amp;_ga=2.76518741.1192788655.1647724933-1242940210.1644448053">Online Builder</a>
              </li> */}
                  <li className='flex items-center'>
                    <a
                      href='../pages/sign-in.html'
                      className='block px-0 py-2 text-sm font-semibold text-white transition-all ease-soft-in-out'
                    >
                      <i className='fa fa-user sm:mr-1' aria-hidden='true' />
                      <span className='hidden sm:inline'>Sign In</span>
                    </a>
                  </li>
                  <li className='flex items-center pl-4 xl:hidden'>
                    <a
                      href='javascript:;'
                      className='block p-0 text-sm text-white transition-all ease-soft-in-out'
                      sidenav-trigger
                    >
                      <div className='overflow-hidden w-4.5'>
                        <i className='relative block bg-white rounded-sm ease-soft mb-0.75 h-0.5 transition-all' />
                        <i className='relative block bg-white rounded-sm ease-soft mb-0.75 h-0.5 transition-all' />
                        <i className='relative block bg-white rounded-sm ease-soft h-0.5 transition-all' />
                      </div>
                    </a>
                  </li>
                  <li className='flex items-center px-4'>
                    <a
                      href='javascript:;'
                      className='p-0 text-sm text-white transition-all ease-soft-in-out'
                    >
                      <i
                        fixed-plugin-button-nav
                        className='cursor-pointer fa fa-cog'
                        aria-hidden='true'
                      />
                      {/* fixed-plugin-button-nav  */}
                    </a>
                  </li>
                  {/* notifications */}
                  <li className='relative flex items-center pr-2'>
                    <p className='hidden transform-dropdown-show' />
                    <a
                      dropdown-trigger
                      href='javascript:;'
                      className='block p-0 text-sm text-white transition-all ease-nav-brand'
                      aria-expanded='false'
                    >
                      <i
                        className='cursor-pointer fa fa-bell'
                        aria-hidden='true'
                      />
                    </a>
                    <ul
                      dropdown-menu
                      className="absolute top-0 right-0 z-50 px-2 py-4 text-sm text-left list-none bg-white border-0 border-transparent border-solid rounded-lg opacity-0 pointer-events-none transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft lg:shadow-soft-3xl duration-250 min-w-44 before:sm:right-7.5 before:text-5.5 origin-top bg-clip-padding text-slate-500 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:mt-2 lg:block lg:cursor-pointer"
                    >
                      {/* add show class on dropdown open js */}
                      <li className='relative mb-2'>
                        <a
                          className='block w-full px-4 bg-transparent rounded-lg ease-soft py-1.2 clear-both whitespace-nowrap duration-300 lg:transition-colors'
                          href='javascript:;'
                        >
                          <div className='flex py-1'>
                            <div className='my-auto'>
                              <img
                                src='../assets/img/team-2.jpg'
                                className='inline-flex items-center justify-center mr-4 text-sm text-white h-9 w-9 max-w-none rounded-xl'
                              />
                            </div>
                            <div className='flex flex-col justify-center'>
                              <h6 className='mb-1 text-sm font-normal leading-normal'>
                                <span className='font-semibold'>
                                  New message
                                </span>{' '}
                                from Laur
                              </h6>
                              <p className='mb-0 text-xs leading-tight text-slate-400'>
                                <i
                                  className='mr-1 fa fa-clock'
                                  aria-hidden='true'
                                />
                                13 minutes ago
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className='relative mb-2'>
                        <a
                          className='block w-full px-4 rounded-lg ease-soft py-1.2 clear-both whitespace-nowrap duration-300 lg:transition-colors'
                          href='javascript:;'
                        >
                          <div className='flex py-1'>
                            <div className='my-auto'>
                              <img
                                src='../assets/img/small-logos/logo-spotify.svg'
                                className='inline-flex items-center justify-center mr-4 text-sm text-white bg-gradient-to-tl from-gray-900 to-slate-800 h-9 w-9 max-w-none rounded-xl'
                              />
                            </div>
                            <div className='flex flex-col justify-center'>
                              <h6 className='mb-1 text-sm font-normal leading-normal'>
                                <span className='font-semibold'>New album</span>{' '}
                                by Travis Scott
                              </h6>
                              <p className='mb-0 text-xs leading-tight text-slate-400'>
                                <i
                                  className='mr-1 fa fa-clock'
                                  aria-hidden='true'
                                />
                                1 day
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className='relative'>
                        <a
                          className='block w-full px-4 rounded-lg ease-soft py-1.2 clear-both whitespace-nowrap duration-300 lg:transition-colors'
                          href='javascript:;'
                        >
                          <div className='flex py-1'>
                            <div className='inline-flex items-center justify-center my-auto mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out bg-gradient-to-tl from-slate-600 to-slate-300 h-9 w-9 rounded-xl'>
                              <svg
                                width='12px'
                                height='12px'
                                viewBox='0 0 43 36'
                                version='1.1'
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                              >
                                <title>credit-card</title>
                                <g
                                  stroke='none'
                                  strokeWidth={1}
                                  fill='none'
                                  fillRule='evenodd'
                                >
                                  <g
                                    transform='translate(-2169.000000, -745.000000)'
                                    fill='#FFFFFF'
                                    fillRule='nonzero'
                                  >
                                    <g transform='translate(1716.000000, 291.000000)'>
                                      <g transform='translate(453.000000, 454.000000)'>
                                        <path
                                          className='color-background'
                                          d='M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z'
                                          opacity='0.593633743'
                                        />
                                        <path
                                          className='color-background'
                                          d='M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z'
                                        />
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                            <div className='flex flex-col justify-center'>
                              <h6 className='mb-1 text-sm font-normal leading-normal'>
                                Payment successfully completed
                              </h6>
                              <p className='mb-0 text-xs leading-tight text-slate-400'>
                                <i
                                  className='mr-1 fa fa-clock'
                                  aria-hidden='true'
                                />
                                2 days
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className='w-full px-6 mx-auto'>
            <div
              className='relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl'
              style={{
                backgroundImage:
                  'url("../assets/img/curved-images/curved0.jpg")',
                backgroundPositionY: '50%',
              }}
            >
              <span className='absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60' />
            </div>
            <div className='relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200'>
              <div className='flex flex-wrap -mx-3'>
                <div className='flex-none w-auto max-w-full px-3'>
                  <div className='relative inline-flex items-center justify-center text-base text-white ease-soft-in-out h-18.5 w-18.5 rounded-xl transition-all duration-200'>
                    <img
                      src='../assets/img/bruce-mars.jpg'
                      alt='profile_image'
                      className='w-full shadow-soft-sm rounded-xl'
                    />
                  </div>
                </div>
                <div className='flex-none w-auto max-w-full px-3 my-auto'>
                  <div className='h-full'>
                    <h5 className='mb-1'>Alec Thompson</h5>
                    <p className='mb-0 text-sm font-semibold leading-normal'>
                      CEO / Co-Founder
                    </p>
                  </div>
                </div>
                <div className='w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12'>
                  <div className='relative right-0'>
                    <ul
                      className='relative flex flex-wrap p-1 list-none bg-transparent rounded-xl'
                      nav-pills
                      role='tablist'
                    >
                      <li className='z-30 flex-auto text-center'>
                        <a
                          className='z-30 block w-full px-0 py-1 mb-0 border-0 rounded-lg transition-all ease-soft-in-out bg-inherit text-slate-700'
                          nav-link
                          active
                          href='javascript:;'
                          role='tab'
                          aria-selected='true'
                        >
                          <svg
                            className='text-slate-700'
                            width='16px'
                            height='16px'
                            viewBox='0 0 42 42'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                          >
                            <g
                              stroke='none'
                              strokeWidth={1}
                              fill='none'
                              fillRule='evenodd'
                            >
                              <g
                                transform='translate(-2319.000000, -291.000000)'
                                fill='#FFFFFF'
                                fillRule='nonzero'
                              >
                                <g transform='translate(1716.000000, 291.000000)'>
                                  <g transform='translate(603.000000, 0.000000)'>
                                    <path
                                      className='fill-slate-800'
                                      d='M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z'
                                    />
                                    <path
                                      className='fill-slate-800'
                                      d='M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z'
                                      opacity='0.7'
                                    />
                                    <path
                                      className='fill-slate-800'
                                      d='M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z'
                                      opacity='0.7'
                                    />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <span className='ml-1'>App</span>
                        </a>
                      </li>
                      <li className='z-30 flex-auto text-center'>
                        <a
                          className='z-30 block w-full px-0 py-1 mb-0 border-0 rounded-lg transition-all ease-soft-in-out bg-inherit text-slate-700'
                          nav-link
                          href='javascript:;'
                          role='tab'
                          aria-selected='false'
                        >
                          <svg
                            className='text-slate-700'
                            width='16px'
                            height='16px'
                            viewBox='0 0 40 44'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                          >
                            <title>document</title>
                            <g
                              stroke='none'
                              strokeWidth={1}
                              fill='none'
                              fillRule='evenodd'
                            >
                              <g
                                transform='translate(-1870.000000, -591.000000)'
                                fill='#FFFFFF'
                                fillRule='nonzero'
                              >
                                <g transform='translate(1716.000000, 291.000000)'>
                                  <g transform='translate(154.000000, 300.000000)'>
                                    <path
                                      className='fill-slate-800'
                                      d='M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z'
                                      opacity='0.603585379'
                                    />
                                    <path
                                      className='fill-slate-800'
                                      d='M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z'
                                    />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <span className='ml-1'>Messages</span>
                        </a>
                      </li>
                      <li className='z-30 flex-auto text-center'>
                        <a
                          className='z-30 block w-full px-0 py-1 mb-0 border-0 rounded-lg transition-colors ease-soft-in-out bg-inherit text-slate-700'
                          nav-link
                          href='javascript:;'
                          role='tab'
                          aria-selected='false'
                        >
                          <svg
                            className='text-slate-700'
                            width='16px'
                            height='16px'
                            viewBox='0 0 40 40'
                            version='1.1'
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                          >
                            <title>settings</title>
                            <g
                              stroke='none'
                              strokeWidth={1}
                              fill='none'
                              fillRule='evenodd'
                            >
                              <g
                                transform='translate(-2020.000000, -442.000000)'
                                fill='#FFFFFF'
                                fillRule='nonzero'
                              >
                                <g transform='translate(1716.000000, 291.000000)'>
                                  <g transform='translate(304.000000, 151.000000)'>
                                    <polygon
                                      className='fill-slate-800'
                                      opacity='0.596981957'
                                      points='18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667'
                                    />
                                    <path
                                      className='fill-slate-800'
                                      d='M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z'
                                      opacity='0.596981957'
                                    />
                                    <path
                                      className='fill-slate-800'
                                      d='M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z'
                                    />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <span className='ml-1'>Settings</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full p-6 mx-auto'>
            <div className='flex flex-wrap -mx-3'>
              <div className='w-full max-w-full px-3 xl:w-4/12'>
                <div className='relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
                  <div className='p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl'>
                    <h6 className='mb-0'>Platform Settings</h6>
                  </div>
                  <div className='flex-auto p-4'>
                    <h6 className='text-xs font-bold leading-tight uppercase text-slate-500'>
                      Account
                    </h6>
                    <ul className='flex flex-col pl-0 mb-0 rounded-lg'>
                      <li className='relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit'>
                        <div className='block pl-0 min-h-6 mb-0.5'>
                          <input
                            id='follow'
                            className="relative float-left w-10 h-5 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                            type='checkbox'
                            defaultChecked
                          />
                          <label
                            htmlFor='follow'
                            className='w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500'
                          >
                            Email me when someone follows me
                          </label>
                        </div>
                      </li>
                      <li className='relative block px-0 py-2 bg-white border-0 text-inherit'>
                        <div className='block pl-0 min-h-6 mb-0.5'>
                          <input
                            id='answer'
                            className="relative float-left w-10 h-5 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                            type='checkbox'
                          />
                          <label
                            htmlFor='answer'
                            className='w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500'
                          >
                            Email me when someone answers on my post
                          </label>
                        </div>
                      </li>
                      <li className='relative block px-0 py-2 bg-white border-0 rounded-b-lg text-inherit'>
                        <div className='block pl-0 min-h-6 mb-0.5'>
                          <input
                            id='mention'
                            className="relative float-left w-10 h-5 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                            type='checkbox'
                            defaultChecked
                          />
                          <label
                            htmlFor='mention'
                            className='w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500'
                          >
                            Email me when someone mentions me
                          </label>
                        </div>
                      </li>
                    </ul>
                    <h6 className='mt-6 text-xs font-bold leading-tight uppercase text-slate-500'>
                      Application
                    </h6>
                    <ul className='flex flex-col pl-0 mb-0 rounded-lg'>
                      <li className='relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit'>
                        <div className='block pl-0 min-h-6 mb-0.5'>
                          <input
                            id='launches projects'
                            className="relative float-left w-10 h-5 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                            type='checkbox'
                          />
                          <label
                            htmlFor='launches projects'
                            className='w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500'
                          >
                            New launches and projects
                          </label>
                        </div>
                      </li>
                      <li className='relative block px-0 py-2 bg-white border-0 text-inherit'>
                        <div className='block pl-0 min-h-6 mb-0.5'>
                          <input
                            id='product updates'
                            className="relative float-left w-10 h-5 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                            type='checkbox'
                            defaultChecked
                          />
                          <label
                            htmlFor='product updates'
                            className='w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500'
                          >
                            Monthly product updates
                          </label>
                        </div>
                      </li>
                      <li className='relative block px-0 py-2 pb-0 bg-white border-0 rounded-b-lg text-inherit'>
                        <div className='block pl-0 min-h-6 mb-0.5'>
                          <input
                            id='subscribe'
                            className="relative float-left w-10 h-5 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                            type='checkbox'
                          />
                          <label
                            htmlFor='subscribe'
                            className='w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500'
                          >
                            Subscribe to newsletter
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12'>
                <div className='relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
                  <div className='p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl'>
                    <div className='flex flex-wrap -mx-3'>
                      <div className='flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none'>
                        <h6 className='mb-0'>Profile Information</h6>
                      </div>
                      <div className='w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none'>
                        <a
                          href='javascript:;'
                          data-target='tooltip_trigger'
                          data-placement='top'
                        >
                          <i className='text-sm leading-normal fas fa-user-edit text-slate-400' />
                        </a>
                        <div
                          data-target='tooltip'
                          className='hidden px-2 py-1 text-sm text-center text-white bg-black rounded-lg'
                          role='tooltip'
                        >
                          Edit Profile
                          <div
                            className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                            data-popper-arrow
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex-auto p-4'>
                    <p className='text-sm leading-normal'>
                      Hi, I’m Alec Thompson, Decisions: If you can’t decide, the
                      answer is no. If two equally difficult paths, choose the
                      one more painful in the short term (pain avoidance is
                      creating an illusion of equality).
                    </p>
                    <hr className='h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent' />
                    <ul className='flex flex-col pl-0 mb-0 rounded-lg'>
                      <li className='relative block px-4 py-2 pt-0 pl-0 text-sm leading-normal bg-white border-0 rounded-t-lg text-inherit'>
                        <strong className='text-slate-700'>Full Name:</strong>{' '}
                        &nbsp; Alec M. Thompson
                      </li>
                      <li className='relative block px-4 py-2 pl-0 text-sm leading-normal bg-white border-0 border-t-0 text-inherit'>
                        <strong className='text-slate-700'>Mobile:</strong>{' '}
                        &nbsp; (44) 123 1234 123
                      </li>
                      <li className='relative block px-4 py-2 pl-0 text-sm leading-normal bg-white border-0 border-t-0 text-inherit'>
                        <strong className='text-slate-700'>Email:</strong>{' '}
                        &nbsp; alecthompson@mail.com
                      </li>
                      <li className='relative block px-4 py-2 pl-0 text-sm leading-normal bg-white border-0 border-t-0 text-inherit'>
                        <strong className='text-slate-700'>Location:</strong>{' '}
                        &nbsp; USA
                      </li>
                      <li className='relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit'>
                        <strong className='text-sm leading-normal text-slate-700'>
                          Social:
                        </strong>{' '}
                        &nbsp;
                        <a
                          className='inline-block py-0 pl-1 pr-2 mb-0 text-xs font-bold text-center text-blue-800 align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in bg-none'
                          href='javascript:;'
                        >
                          <i className='fab fa-facebook fa-lg' />
                        </a>
                        <a
                          className='inline-block py-0 pl-1 pr-2 mb-0 text-xs font-bold text-center align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in bg-none text-sky-600'
                          href='javascript:;'
                        >
                          <i className='fab fa-twitter fa-lg' />
                        </a>
                        <a
                          className='inline-block py-0 pl-1 pr-2 mb-0 text-xs font-bold text-center align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in bg-none text-sky-900'
                          href='javascript:;'
                        >
                          <i className='fab fa-instagram fa-lg' />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12'>
                <div className='relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
                  <div className='p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl'>
                    <h6 className='mb-0'>Conversations</h6>
                  </div>
                  <div className='flex-auto p-4'>
                    <ul className='flex flex-col pl-0 mb-0 rounded-lg'>
                      <li className='relative flex items-center px-0 py-2 mb-2 bg-white border-0 rounded-t-lg text-inherit'>
                        <div className='inline-flex items-center justify-center w-12 h-12 mr-4 text-base text-white transition-all duration-200 ease-soft-in-out rounded-xl'>
                          <img
                            src='../assets/img/kal-visuals-square.jpg'
                            alt='kal'
                            className='w-full shadow-soft-2xl rounded-xl'
                          />
                        </div>
                        <div className='flex flex-col items-start justify-center'>
                          <h6 className='mb-0 text-sm leading-normal'>
                            Sophie B.
                          </h6>
                          <p className='mb-0 text-xs leading-tight'>
                            Hi! I need more information..
                          </p>
                        </div>
                        <a
                          className='inline-block py-3 pl-0 pr-4 mb-0 ml-auto text-xs font-bold text-center uppercase align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100'
                          href='javascript:;'
                        >
                          Reply
                        </a>
                      </li>
                      <li className='relative flex items-center px-0 py-2 mb-2 bg-white border-0 border-t-0 text-inherit'>
                        <div className='inline-flex items-center justify-center w-12 h-12 mr-4 text-base text-white transition-all duration-200 ease-soft-in-out rounded-xl'>
                          <img
                            src='../assets/img/marie.jpg'
                            alt='kal'
                            className='w-full shadow-soft-2xl rounded-xl'
                          />
                        </div>
                        <div className='flex flex-col items-start justify-center'>
                          <h6 className='mb-0 text-sm leading-normal'>
                            Anne Marie
                          </h6>
                          <p className='mb-0 text-xs leading-tight'>
                            Awesome work, can you..
                          </p>
                        </div>
                        <a
                          className='inline-block py-3 pl-0 pr-4 mb-0 ml-auto text-xs font-bold text-center uppercase align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100'
                          href='javascript:;'
                        >
                          Reply
                        </a>
                      </li>
                      <li className='relative flex items-center px-0 py-2 mb-2 bg-white border-0 border-t-0 text-inherit'>
                        <div className='inline-flex items-center justify-center w-12 h-12 mr-4 text-base text-white transition-all duration-200 ease-soft-in-out rounded-xl'>
                          <img
                            src='../assets/img/ivana-square.jpg'
                            alt='kal'
                            className='w-full shadow-soft-2xl rounded-xl'
                          />
                        </div>
                        <div className='flex flex-col items-start justify-center'>
                          <h6 className='mb-0 text-sm leading-normal'>
                            Ivanna
                          </h6>
                          <p className='mb-0 text-xs leading-tight'>
                            About files I can..
                          </p>
                        </div>
                        <a
                          className='inline-block py-3 pl-0 pr-4 mb-0 ml-auto text-xs font-bold text-center uppercase align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100'
                          href='javascript:;'
                        >
                          Reply
                        </a>
                      </li>
                      <li className='relative flex items-center px-0 py-2 mb-2 bg-white border-0 border-t-0 text-inherit'>
                        <div className='inline-flex items-center justify-center w-12 h-12 mr-4 text-base text-white transition-all duration-200 ease-soft-in-out rounded-xl'>
                          <img
                            src='../assets/img/team-4.jpg'
                            alt='kal'
                            className='w-full shadow-soft-2xl rounded-xl'
                          />
                        </div>
                        <div className='flex flex-col items-start justify-center'>
                          <h6 className='mb-0 text-sm leading-normal'>
                            Peterson
                          </h6>
                          <p className='mb-0 text-xs leading-tight'>
                            Have a great afternoon..
                          </p>
                        </div>
                        <a
                          className='inline-block py-3 pl-0 pr-4 mb-0 ml-auto text-xs font-bold text-center uppercase align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100'
                          href='javascript:;'
                        >
                          Reply
                        </a>
                      </li>
                      <li className='relative flex items-center px-0 py-2 bg-white border-0 border-t-0 rounded-b-lg text-inherit'>
                        <div className='inline-flex items-center justify-center w-12 h-12 mr-4 text-base text-white transition-all duration-200 ease-soft-in-out rounded-xl'>
                          <img
                            src='../assets/img/team-3.jpg'
                            alt='kal'
                            className='w-full shadow-soft-2xl rounded-xl'
                          />
                        </div>
                        <div className='flex flex-col items-start justify-center'>
                          <h6 className='mb-0 text-sm leading-normal'>
                            Nick Daniel
                          </h6>
                          <p className='mb-0 text-xs leading-tight'>
                            Hi! I need more information..
                          </p>
                        </div>
                        <a
                          className='inline-block py-3 pl-0 pr-4 mb-0 ml-auto text-xs font-bold text-center uppercase align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100'
                          href='javascript:;'
                        >
                          Reply
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='flex-none w-full max-w-full px-3 mt-6'>
                <div className='relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
                  <div className='p-4 pb-0 mb-0 bg-white rounded-t-2xl'>
                    <h6 className='mb-1'>Projects</h6>
                    <p className='text-sm leading-normal'>
                      Architects design houses
                    </p>
                  </div>
                  <div className='flex-auto p-4'>
                    <div className='flex flex-wrap -mx-3'>
                      <div className='w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12'>
                        <div className='relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border'>
                          <div className='relative'>
                            <a className='block shadow-xl rounded-2xl'>
                              <img
                                src='../assets/img/home-decor-1.jpg'
                                alt='img-blur-shadow'
                                className='max-w-full shadow-soft-2xl rounded-2xl'
                              />
                            </a>
                          </div>
                          <div className='flex-auto px-1 pt-6'>
                            <p className='relative z-10 mb-2 text-sm leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 bg-clip-text'>
                              Project #2
                            </p>
                            <a href='javascript:;'>
                              <h5>Modern</h5>
                            </a>
                            <p className='mb-6 text-sm leading-normal'>
                              As Uber works through a huge amount of internal
                              management turmoil.
                            </p>
                            <div className='flex items-center justify-between'>
                              <button
                                type='button'
                                className='inline-block px-8 py-2 mb-0 text-xs font-bold text-center uppercase align-middle bg-transparent border border-solid rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'
                              >
                                View Project
                              </button>
                              <div className='mt-2'>
                                <a
                                  href='javascript:;'
                                  className='relative z-20 inline-flex items-center justify-center w-6 h-6 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                                  data-target='tooltip_trigger'
                                  data-placement='bottom'
                                >
                                  <img
                                    className='w-full rounded-circle'
                                    alt='Image placeholder'
                                    src='../assets/img/team-1.jpg'
                                  />
                                </a>
                                <div
                                  data-target='tooltip'
                                  className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                                  role='tooltip'
                                >
                                  Elena Morison
                                  <div
                                    className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                    data-popper-arrow
                                  />
                                </div>
                                <a
                                  href='javascript:;'
                                  className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                                  data-target='tooltip_trigger'
                                  data-placement='bottom'
                                >
                                  <img
                                    className='w-full rounded-circle'
                                    alt='Image placeholder'
                                    src='../assets/img/team-2.jpg'
                                  />
                                </a>
                                <div
                                  data-target='tooltip'
                                  className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                                  role='tooltip'
                                >
                                  Ryan Milly
                                  <div
                                    className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                    data-popper-arrow
                                  />
                                </div>
                                <a
                                  href='javascript:;'
                                  className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                                  data-target='tooltip_trigger'
                                  data-placement='bottom'
                                >
                                  <img
                                    className='w-full rounded-circle'
                                    alt='Image placeholder'
                                    src='../assets/img/team-3.jpg'
                                  />
                                </a>
                                <div
                                  data-target='tooltip'
                                  className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                                  role='tooltip'
                                >
                                  Nick Daniel
                                  <div
                                    className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                    data-popper-arrow
                                  />
                                </div>
                                <a
                                  href='javascript:;'
                                  className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                                  data-target='tooltip_trigger'
                                  data-placement='bottom'
                                >
                                  <img
                                    className='w-full rounded-circle'
                                    alt='Image placeholder'
                                    src='../assets/img/team-4.jpg'
                                  />
                                </a>
                                <div
                                  data-target='tooltip'
                                  className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                                  role='tooltip'
                                >
                                  Peterson
                                  <div
                                    className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                    data-popper-arrow
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12'>
                        <div className='relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border'>
                          <div className='relative'>
                            <a className='block shadow-xl rounded-2xl'>
                              <img
                                src='../assets/img/home-decor-2.jpg'
                                alt='img-blur-shadow'
                                className='max-w-full shadow-soft-2xl rounded-xl'
                              />
                            </a>
                          </div>
                          <div className='flex-auto px-1 pt-6'>
                            <p className='relative z-10 mb-2 text-sm leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 bg-clip-text'>
                              Project #1
                            </p>
                            <a href='javascript:;'>
                              <h5>Scandinavian</h5>
                            </a>
                            <p className='mb-6 text-sm leading-normal'>
                              Music is something that every person has his or
                              her own specific opinion about.
                            </p>
                            <div className='flex items-center justify-between'>
                              <button
                                type='button'
                                className='inline-block px-8 py-2 mb-0 text-xs font-bold text-center uppercase align-middle bg-transparent border border-solid rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'
                              >
                                View Project
                              </button>
                              <div className='mt-2'>
                                <a
                                  href='javascript:;'
                                  className='relative z-20 inline-flex items-center justify-center w-6 h-6 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                                  data-target='tooltip_trigger'
                                  data-placement='bottom'
                                >
                                  <img
                                    className='w-full rounded-circle'
                                    alt='Image placeholder'
                                    src='../assets/img/team-3.jpg'
                                  />
                                </a>
                                <div
                                  data-target='tooltip'
                                  className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                                  role='tooltip'
                                >
                                  Nick Daniel
                                  <div
                                    className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                    data-popper-arrow
                                  />
                                </div>
                                <a
                                  href='javascript:;'
                                  className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                                  data-target='tooltip_trigger'
                                  data-placement='bottom'
                                >
                                  <img
                                    className='w-full rounded-circle'
                                    alt='Image placeholder'
                                    src='../assets/img/team-4.jpg'
                                  />
                                </a>
                                <div
                                  data-target='tooltip'
                                  className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                                  role='tooltip'
                                >
                                  Peterson
                                  <div
                                    className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                    data-popper-arrow
                                  />
                                </div>
                                <a
                                  href='javascript:;'
                                  className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                                  data-target='tooltip_trigger'
                                  data-placement='bottom'
                                >
                                  <img
                                    className='w-full rounded-circle'
                                    alt='Image placeholder'
                                    src='../assets/img/team-1.jpg'
                                  />
                                </a>
                                <div
                                  data-target='tooltip'
                                  className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                                  role='tooltip'
                                >
                                  Elena Morison
                                  <div
                                    className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                    data-popper-arrow
                                  />
                                </div>
                                <a
                                  href='javascript:;'
                                  className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                                  data-target='tooltip_trigger'
                                  data-placement='bottom'
                                >
                                  <img
                                    className='w-full rounded-circle'
                                    alt='Image placeholder'
                                    src='../assets/img/team-2.jpg'
                                  />
                                </a>
                                <div
                                  data-target='tooltip'
                                  className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                                  role='tooltip'
                                >
                                  Ryan Milly
                                  <div
                                    className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                    data-popper-arrow
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12'>
                        <div className='relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border'>
                          <div className='relative'>
                            <a className='block shadow-xl rounded-2xl'>
                              <img
                                src='../assets/img/home-decor-3.jpg'
                                alt='img-blur-shadow'
                                className='max-w-full shadow-soft-2xl rounded-2xl'
                              />
                            </a>
                          </div>
                          <div className='flex-auto px-1 pt-6'>
                            <p className='relative z-10 mb-2 text-sm leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 bg-clip-text'>
                              Project #3
                            </p>
                            <a href='javascript:;'>
                              <h5>Minimalist</h5>
                            </a>
                            <p className='mb-6 text-sm leading-normal'>
                              Different people have different taste, and various
                              types of music.
                            </p>
                            <div className='flex items-center justify-between'>
                              <button
                                type='button'
                                className='inline-block px-8 py-2 mb-0 text-xs font-bold text-center uppercase align-middle bg-transparent border border-solid rounded-lg shadow-none cursor-pointer transition-all leading-pro ease-soft-in hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500'
                              >
                                View Project
                              </button>
                              <div className='mt-2'>
                                <a
                                  href='javascript:;'
                                  className='relative z-20 inline-flex items-center justify-center w-6 h-6 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                                  data-target='tooltip_trigger'
                                  data-placement='bottom'
                                >
                                  <img
                                    className='w-full rounded-circle'
                                    alt='Image placeholder'
                                    src='../assets/img/team-4.jpg'
                                  />
                                </a>
                                <div
                                  data-target='tooltip'
                                  className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                                  role='tooltip'
                                >
                                  Peterson
                                  <div
                                    className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                    data-popper-arrow
                                  />
                                </div>
                                <a
                                  href='javascript:;'
                                  className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                                  data-target='tooltip_trigger'
                                  data-placement='bottom'
                                >
                                  <img
                                    className='w-full rounded-circle'
                                    alt='Image placeholder'
                                    src='../assets/img/team-3.jpg'
                                  />
                                </a>
                                <div
                                  data-target='tooltip'
                                  className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                                  role='tooltip'
                                >
                                  Nick Daniel
                                  <div
                                    className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                    data-popper-arrow
                                  />
                                </div>
                                <a
                                  href='javascript:;'
                                  className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                                  data-target='tooltip_trigger'
                                  data-placement='bottom'
                                >
                                  <img
                                    className='w-full rounded-circle'
                                    alt='Image placeholder'
                                    src='../assets/img/team-2.jpg'
                                  />
                                </a>
                                <div
                                  data-target='tooltip'
                                  className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                                  role='tooltip'
                                >
                                  Ryan Milly
                                  <div
                                    className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                    data-popper-arrow
                                  />
                                </div>
                                <a
                                  href='javascript:;'
                                  className='relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white border-2 border-white border-solid transition-all duration-200 ease-soft-in-out rounded-circle hover:z-30'
                                  data-target='tooltip_trigger'
                                  data-placement='bottom'
                                >
                                  <img
                                    className='w-full rounded-circle'
                                    alt='Image placeholder'
                                    src='../assets/img/team-1.jpg'
                                  />
                                </a>
                                <div
                                  data-target='tooltip'
                                  className='hidden px-2 py-1 text-sm text-white bg-black rounded-lg'
                                  role='tooltip'
                                >
                                  Elena Morison
                                  <div
                                    className="absolute invisible w-2 h-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                    data-popper-arrow
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12'>
                        <div className='relative flex flex-col h-full min-w-0 break-words bg-transparent border border-solid shadow-none rounded-2xl border-slate-100 bg-clip-border'>
                          <div className='flex flex-col justify-center flex-auto p-6 text-center'>
                            <a href='javascript:;'>
                              <i className='mb-4 fa fa-plus text-slate-400' />
                              <h5 className='text-slate-400'>New project</h5>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className='pt-4'>
              <div className='w-full px-6 mx-auto'>
                <div className='flex flex-wrap items-center -mx-3 lg:justify-between'>
                  <div className='w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none'>
                    <div className='text-sm leading-normal text-center text-slate-500 lg:text-left'>
                      © made with <i className='fa fa-heart' /> by
                      <a
                        href='https://www.creative-tim.com'
                        className='font-semibold text-slate-700'
                        target='_blank'
                        rel='noreferrer'
                      >
                        Creative Tim
                      </a>
                      for a better web.
                    </div>
                  </div>
                  <div className='w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none'>
                    <ul className='flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end'>
                      <li className='nav-item'>
                        <a
                          href='https://www.creative-tim.com'
                          className='block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Creative Tim
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a
                          href='https://www.creative-tim.com/presentation'
                          className='block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500'
                          target='_blank'
                          rel='noreferrer'
                        >
                          About Us
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a
                          href='https://creative-tim.com/blog'
                          className='block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Blog
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a
                          href='https://www.creative-tim.com/license'
                          className='block px-4 pt-0 pb-1 pr-0 text-sm font-normal transition-colors ease-soft-in-out text-slate-500'
                          target='_blank'
                          rel='noreferrer'
                        >
                          License
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <div fixed-plugin>
          <a
            fixed-plugin-button
            className='fixed px-4 py-2 text-xl bg-white cursor-pointer bottom-7.5 right-7.5 z-990 shadow-soft-lg rounded-circle text-slate-700'
          >
            <i className='py-2 pointer-events-none fa fa-cog'> </i>
          </a>
          {/* -right-90 in loc de 0*/}
          <div
            fixed-plugin-card
            className='fixed top-0 left-auto flex flex-col h-full min-w-0 break-words bg-white border-0 rounded-none z-sticky shadow-soft-3xl w-90 ease-soft -right-90 bg-clip-border px-2.5 duration-200'
          >
            <div className='px-6 pt-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl'>
              <div className='float-left'>
                <h5 className='mt-4 mb-0'>Soft UI Configurator</h5>
                <p>See our dashboard options.</p>
              </div>
              <div className='float-right mt-6'>
                <button
                  fixed-plugin-close-button
                  className='inline-block p-0 mb-4 text-xs font-bold text-center uppercase align-middle bg-transparent border-0 rounded-lg shadow-none cursor-pointer transition-all hover:scale-102 leading-pro ease-soft-in tracking-tight-soft bg-150 bg-x-25 active:opacity-85 text-slate-700'
                >
                  <i className='fa fa-close' />
                </button>
              </div>
              {/* End Toggle Button */}
            </div>
            <hr className='h-px mx-0 my-1 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent' />
            <div className='flex-auto p-6 pt-0 sm:pt-4'>
              {/* Sidebar Backgrounds */}
              <div>
                <h6 className='mb-0'>Sidebar Colors</h6>
              </div>
              <a href='javascript:void(0)'>
                <div className='my-2 text-left' sidenav-colors>
                  <span
                    className='relative inline-block text-xs font-bold leading-none text-center text-white uppercase align-baseline border border-solid cursor-pointer py-2.2 px-3.6 rounded-circle h-5.75 mr-1.25 w-5.75 ease-soft-in-out bg-gradient-to-tl from-purple-700 to-pink-500 whitespace-nowrap border-slate-700 transition-all duration-200 hover:border-slate-700'
                    active-color
                    data-color-from='purple-700'
                    data-color-to='pink-500'
                    onclick='sidebarColor(this)'
                  />
                  <span
                    className='relative inline-block text-xs font-bold leading-none text-center text-white uppercase align-baseline border border-white border-solid cursor-pointer py-2.2 px-3.6 rounded-circle h-5.75 mr-1.25 w-5.75 ease-soft-in-out bg-gradient-to-tl from-gray-900 to-slate-800 whitespace-nowrap transition-all duration-200 hover:border-slate-700'
                    data-color-from='gray-900'
                    data-color-to='slate-800'
                    onclick='sidebarColor(this)'
                  />
                  <span
                    className='relative inline-block text-xs font-bold leading-none text-center text-white uppercase align-baseline border border-white border-solid cursor-pointer py-2.2 px-3.6 rounded-circle h-5.75 mr-1.25 w-5.75 ease-soft-in-out bg-gradient-to-tl from-blue-600 to-cyan-400 whitespace-nowrap transition-all duration-200 hover:border-slate-700'
                    data-color-from='blue-600'
                    data-color-to='cyan-400'
                    onclick='sidebarColor(this)'
                  />
                  <span
                    className='relative inline-block text-xs font-bold leading-none text-center text-white uppercase align-baseline border border-white border-solid cursor-pointer py-2.2 px-3.6 rounded-circle h-5.75 mr-1.25 w-5.75 ease-soft-in-out bg-gradient-to-tl from-green-600 to-lime-400 whitespace-nowrap transition-all duration-200 hover:border-slate-700'
                    data-color-from='green-600'
                    data-color-to='lime-400'
                    onclick='sidebarColor(this)'
                  />
                  <span
                    className='relative inline-block text-xs font-bold leading-none text-center text-white uppercase align-baseline border border-white border-solid cursor-pointer py-2.2 px-3.6 rounded-circle h-5.75 mr-1.25 w-5.75 ease-soft-in-out bg-gradient-to-tl from-red-500 to-yellow-400 whitespace-nowrap transition-all duration-200 hover:border-slate-700'
                    data-color-from='red-500'
                    data-color-to='yellow-400'
                    onclick='sidebarColor(this)'
                  />
                  <span
                    className='relative inline-block text-xs font-bold leading-none text-center text-white uppercase align-baseline border border-white border-solid cursor-pointer py-2.2 px-3.6 rounded-circle h-5.75 mr-1.25 w-5.75 ease-soft-in-out bg-gradient-to-tl from-red-600 to-rose-400 whitespace-nowrap transition-all duration-200 hover:border-slate-700'
                    data-color-from='red-600'
                    data-color-to='rose-400'
                    onclick='sidebarColor(this)'
                  />
                </div>
              </a>
              {/* Sidenav Type */}
              <div className='mt-4'>
                <h6 className='mb-0'>Sidenav Type</h6>
                <p className='text-sm leading-normal'>
                  Choose between 2 different sidenav types.
                </p>
              </div>
              <div className='flex'>
                <button
                  transparent-style-btn
                  className='inline-block w-full px-4 py-3 mb-2 text-xs font-bold text-center text-white uppercase align-middle border border-transparent border-solid rounded-lg cursor-pointer transition-all xl-max:cursor-not-allowed xl-max:opacity-65 xl-max:pointer-events-none xl-max:bg-gradient-to-tl xl-max:from-purple-700 xl-max:to-pink-500 xl-max:text-white xl-max:border-0 hover:scale-102 hover:shadow-soft-xs active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-purple-700 to-pink-500 bg-fuchsia-500 hover:border-fuchsia-500'
                  data-class='bg-transparent'
                  active-style
                >
                  Transparent
                </button>
                <button
                  white-style-btn
                  className='inline-block w-full px-4 py-3 mb-2 ml-2 text-xs font-bold text-center uppercase align-middle bg-transparent border border-solid rounded-lg cursor-pointer transition-all xl-max:cursor-not-allowed xl-max:opacity-65 xl-max:pointer-events-none xl-max:bg-gradient-to-tl xl-max:from-purple-700 xl-max:to-pink-500 xl-max:text-white xl-max:border-0 hover:scale-102 hover:shadow-soft-xs active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 border-fuchsia-500 bg-none text-fuchsia-500 hover:border-fuchsia-500'
                  data-class='bg-white'
                >
                  White
                </button>
              </div>
              <p className='block mt-2 text-sm leading-normal xl:hidden'>
                You can change the sidenav type just on desktop view.
              </p>
              {/* Navbar Fixed */}
              <div className='mt-4'>
                <h6 className='mb-0'>Navbar Fixed</h6>
              </div>
              <div className='block pl-0 min-h-6 mb-0.5'>
                <input
                  className="relative float-left w-10 h-5 mt-1 ml-auto align-top bg-left bg-no-repeat bg-contain border border-gray-200 border-solid appearance-none cursor-pointer rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 bg-slate-800/10 bg-none transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                  type='checkbox'
                  navbarfixed
                />
              </div>
              <hr className='h-px bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent sm:my-6' />
              <a
                className='inline-block w-full px-6 py-3 mb-4 text-xs font-bold text-center text-white uppercase align-middle bg-transparent border-0 rounded-lg cursor-pointer transition-all leading-pro ease-soft-in hover:shadow-soft-xs hover:scale-102 active:opacity-85 tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800'
                href='https://www.creative-tim.com/product/soft-ui-dashboard-tailwind'
                target='_blank'
                rel='noreferrer'
              >
                Free Download
              </a>
              <a
                className='inline-block w-full px-6 py-3 mb-4 text-xs font-bold text-center uppercase align-middle bg-transparent border border-solid rounded-lg shadow-none cursor-pointer transition-all active:shadow-soft-xs hover:scale-102 active:opacity-85 leading-pro ease-soft-in tracking-tight-soft bg-150 bg-x-25 border-slate-700 text-slate-700 hover:bg-transparent hover:text-slate-700 hover:shadow-none active:bg-slate-700 active:text-white active:hover:bg-transparent active:hover:text-slate-700 active:hover:shadow-none'
                href='https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/soft-ui-dashboard/'
                target='_blank'
                rel='noreferrer'
              >
                View documentation
              </a>
              <div className='w-full text-center'>
                <a
                  className='github-button'
                  href='https://github.com/creativetimofficial/soft-ui-dashboard-tailwind'
                  data-icon='octicon-star'
                  data-size='large'
                  data-show-count='true'
                  aria-label='Star creativetimofficial/soft-ui-dashboard on GitHub'
                >
                  Star
                </a>
                <h6 className='mt-4'>Thank you for sharing!</h6>
                <a
                  href='https://twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20Tailwind%20made%20by%20%40CreativeTim&hashtags=webdesign,dashboard,tailwindcss&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-tailwind'
                  className='inline-block px-6 py-3 mb-0 mr-2 text-xs font-bold text-center text-white uppercase align-middle border-0 rounded-lg cursor-pointer transition-all hover:shadow-soft-xs hover:scale-102 active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 me-2 border-slate-700 bg-slate-700'
                  target='_blank'
                  rel='noreferrer'
                >
                  {' '}
                  <i
                    className='mr-1 fab fa-twitter'
                    aria-hidden='true'
                  /> Tweet{' '}
                </a>
                <a
                  href='https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/soft-ui-dashboard-tailwind'
                  className='inline-block px-6 py-3 mb-0 mr-2 text-xs font-bold text-center text-white uppercase align-middle border-0 rounded-lg cursor-pointer transition-all hover:shadow-soft-xs hover:scale-102 active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 me-2 border-slate-700 bg-slate-700'
                  target='_blank'
                  rel='noreferrer'
                >
                  {' '}
                  <i
                    className='mr-1 fab fa-facebook-square'
                    aria-hidden='true'
                  />{' '}
                  Share{' '}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/*
 {gate.userSession && (
        <>
          Home
          <img
            className='cursor-pointer'
            src={`/hud/login-logout.png`}
            onClick={() => {
              //
              signOut()
            }}
            // onClick={() => {
            //   //
            //   signOut()
            // }}
          ></img>
        </>
      )}
      {!gate.userSession && (
        <>
          <img
            className='cursor-pointer'
            src={`/hud/login-google.png`}
            onClick={() => {
              //
              loginGoogle()
              //
            }}
          ></img>

          {gate.supportEth && (
            <img
              className='cursor-pointer'
              src={`/hud/login-metamask.png`}
              onClick={() => {
                //
                loginEth()
                //
              }}
            ></img>
          )}

          <img
            className='cursor-pointer'
            src={`/hud/login-guest.png`}
            onClick={() => {
              //
              loginGuest()
              //
            }}
          ></img>

          {process.env.NODE_ENV === 'development' && (
            <img
              className='cursor-pointer'
              src={`/hud/login-guest.png`}
              onClick={() => {
                //
                loginGuestLocal()
                //
              }}
            ></img>
          )}
        </>
      )}
*/
