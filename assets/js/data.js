/* ============================================================
   Data for the landscape charts.
   Transcribed from the two source spreadsheets (May 2026).
   x = decimal release year (year + (month-1)/12) so points spread by date.
   ============================================================ */

/* ---- Robots: cost vs. release year, grouped by openness ----
   Source: bit.ly sheet 146TmNJ_… (MOVEO dropped; Waveshare + closed drones/chassis/hands added → 77 plotted). */
window.ROBOTS = [
  { name: "UR5", maker: "Universal Robots", cat: "arm", open: "closed", x: 2008.5, cost: 35000 },
  { name: "Franka Emika Panda", maker: "Franka Emika", cat: "arm", open: "closed", x: 2017.5, cost: 10500 },
  { name: "Franka Research 3", maker: "Franka Robotics", cat: "arm", open: "closed", x: 2022.5, cost: 15000 },
  { name: "UFactory xArm 6", maker: "UFactory", cat: "arm", open: "closed", x: 2018.5, cost: 9000 },
  { name: "ViperX 300 S", maker: "Trossen Robotics", cat: "arm", open: "closed", x: 2020.5, cost: 6130 },
  { name: "WidowX 250 S", maker: "Trossen Robotics", cat: "arm", open: "closed", x: 2020.5, cost: 3550 },
  { name: "AgileX PiPER", maker: "AgileX Robotics", cat: "arm", open: "closed", x: 2024.5, cost: 2499 },
  { name: "myCobot 280", maker: "Elephant Robotics", cat: "arm", open: "closed", x: 2020.5, cost: 700 },
  { name: "Waveshare RoArm-M3", maker: "Waveshare", cat: "arm", open: "closed", x: 2025.13, cost: 200 },
  { name: "Niryo Ned2", maker: "Niryo", cat: "arm", open: "closed", x: 2022.5, cost: 3500 },
  { name: "AR4 (MK3)", maker: "Annin Robotics", cat: "arm", open: "open", x: 2021.5, cost: 2000 },
  { name: "Koch v1.1", maker: "Community", cat: "arm", open: "open", x: 2024.29, cost: 250 },
  { name: "SO-100", maker: "TheRobotStudio + HF", cat: "arm", open: "open", x: 2024.5, cost: 110 },
  { name: "SO-101", maker: "TheRobotStudio + HF", cat: "arm", open: "open", x: 2025.29, cost: 130 },
  { name: "ALOHA", maker: "Stanford", cat: "bimanual arm", open: "closed", x: 2023.29, cost: 20000 },
  { name: "ALOHA 2", maker: "Google DeepMind + Stanford", cat: "bimanual arm", open: "closed", x: 2024.37, cost: 20000 },
  { name: "Mobile ALOHA", maker: "Stanford", cat: "mobile manipulator", open: "open", x: 2024.04, cost: 32000 },
  { name: "InMoov", maker: "Gael Langevin", cat: "humanoid", open: "open", x: 2012.04, cost: 1000 },
  { name: "Poppy Humanoid", maker: "Poppy Project / Inria", cat: "humanoid", open: "open", x: 2013.5, cost: 8500 },
  { name: "Unitree Laikago", maker: "Unitree", cat: "quadruped", open: "closed", x: 2017.5, cost: 45000 },
  { name: "Unitree A1", maker: "Unitree", cat: "quadruped", open: "closed", x: 2020.04, cost: 9000 },
  { name: "Unitree Go1", maker: "Unitree", cat: "quadruped", open: "closed", x: 2021.46, cost: 2700 },
  { name: "Unitree Go2", maker: "Unitree", cat: "quadruped", open: "closed", x: 2023.53, cost: 1600 },
  { name: "Boston Dynamics Spot", maker: "Boston Dynamics", cat: "quadruped", open: "closed", x: 2020.46, cost: 74500 },
  { name: "Stanford Doggo", maker: "Stanford", cat: "quadruped", open: "open", x: 2019.37, cost: 3000 },
  { name: "Stanford Pupper", maker: "Stanford Robotics Club", cat: "quadruped", open: "open", x: 2021.79, cost: 800 },
  { name: "SOLO 8", maker: "ODRI (NYU + MPI)", cat: "quadruped", open: "open", x: 2020.46, cost: 4400 },
  { name: "Petoi Bittle", maker: "Petoi", cat: "quadruped", open: "open", x: 2020.65, cost: 300 },
  { name: "Unitree H1", maker: "Unitree", cat: "humanoid", open: "closed", x: 2023.62, cost: 90000 },
  { name: "Unitree G1", maker: "Unitree", cat: "humanoid", open: "closed", x: 2024.37, cost: 16000 },
  { name: "Reachy 2", maker: "Pollen Robotics / HF", cat: "humanoid", open: "closed", x: 2024.79, cost: 70000 },
  { name: "HopeJR", maker: "HF + Pollen Robotics", cat: "humanoid", open: "open", x: 2025.41, cost: 3000 },
  { name: "Berkeley Humanoid Lite", maker: "UC Berkeley", cat: "humanoid", open: "open", x: 2025.29, cost: 4300 },
  { name: "Reachy Mini", maker: "HF / Pollen Robotics", cat: "desktop robot", open: "open", x: 2025.41, cost: 299 },
  { name: "Crazyflie 2.0", maker: "Bitcraze", cat: "drone", open: "open", x: 2015.5, cost: 180 },
  { name: "Crazyflie 2.1", maker: "Bitcraze", cat: "drone", open: "open", x: 2019.13, cost: 200 },
  { name: "TurtleBot 3 Burger", maker: "ROBOTIS / Open Robotics", cat: "mobile base", open: "open", x: 2017.5, cost: 590 },
  { name: "TurtleBot 4 Standard", maker: "Clearpath / Open Robotics", cat: "mobile base", open: "open", x: 2022.37, cost: 1850 },
  { name: "LeKiwi", maker: "Community / LeRobot", cat: "mobile manipulator", open: "open", x: 2024.5, cost: 500 },
  { name: "reBot Arm B601", maker: "Seeed Studio", cat: "arm", open: "open", x: 2026.29, cost: 1197 },
  { name: "XLeRobot", maker: "Vector Wang / community", cat: "mobile manipulator", open: "open", x: 2025.37, cost: 660 },
  { name: "Bambot", maker: "Tim Qian / community", cat: "mobile manipulator", open: "open", x: 2025.5, cost: 300 },
  { name: "OpenArm", maker: "Enactic", cat: "arm", open: "open", x: 2025.5, cost: 3250 },
  { name: "K-Bot", maker: "K-Scale Labs", cat: "humanoid", open: "open", x: 2025.37, cost: 8999 },
  { name: "Unitree R1", maker: "Unitree", cat: "humanoid", open: "closed", x: 2025.54, cost: 5900 },
  { name: "ToddlerBot", maker: "Stanford University", cat: "humanoid", open: "open", x: 2025.13, cost: 6000 },
  { name: "LEAP Hand", maker: "Carnegie Mellon", cat: "hand", open: "open", x: 2023.54, cost: 2000 },
  { name: "ORCA Hand", maker: "ETH Zurich", cat: "hand", open: "open", x: 2025.29, cost: 2200 },
  { name: "RUKA Hand", maker: "New York University", cat: "hand", open: "open", x: 2025.29, cost: 1300 },
  { name: "Shadow Dexterous Hand", maker: "Shadow Robot", cat: "hand", open: "closed", x: 2005.5, cost: 100000 },
  { name: "Allegro Hand", maker: "Wonik Robotics", cat: "hand", open: "closed", x: 2008.5, cost: 15000 },
  { name: "1X NEO", maker: "1X Technologies", cat: "humanoid", open: "closed", x: 2025.79, cost: 20000 },
  { name: "Sunday Memo", maker: "Sunday Robotics", cat: "humanoid", open: "closed", x: 2025.87, cost: 20000 },
  { name: "Inspire Hand", maker: "Inspire Robots", cat: "hand", open: "closed", x: 2022.5, cost: 4500 },
  { name: "Amazing Hand", maker: "Pollen Robotics / HF", cat: "hand", open: "open", x: 2025.54, cost: 200 },
  { name: "Z-Bot", maker: "K-Scale Labs", cat: "humanoid", open: "open", x: 2025.37, cost: 999 },
  { name: "EngineAI PM01", maker: "EngineAI", cat: "humanoid", open: "closed", x: 2024.96, cost: 13700 },
  { name: "Booster T1", maker: "Booster Robotics", cat: "humanoid", open: "closed", x: 2024.5, cost: 34000 },
  { name: "Unitree H2", maker: "Unitree", cat: "humanoid", open: "closed", x: 2025.87, cost: 29900 },
  { name: "Fourier N1", maker: "Fourier Intelligence", cat: "humanoid", open: "closed", x: 2025.21, cost: 15000 },
  { name: "Lebai LM3", maker: "Lebai Robotics", cat: "arm", open: "closed", x: 2020.5, cost: 5000 },
  { name: "OpenMANIPULATOR-X", maker: "ROBOTIS", cat: "arm", open: "open", x: 2018.5, cost: 2500 },
  { name: "iCub", maker: "IIT", cat: "humanoid", open: "open", x: 2008.5, cost: 270000 },
  { name: "Hello Robot Stretch 3", maker: "Hello Robot", cat: "mobile manipulator", open: "open", x: 2024.13, cost: 24950 },
  { name: "Realman RM65-B", maker: "Realman Robotics", cat: "arm", open: "closed", x: 2021.5, cost: 17670 },
  { name: "DJI RoboMaster S1", maker: "DJI", cat: "mobile base", open: "closed", x: 2019.46, cost: 499 },
  { name: "DJI RoboMaster EP Core", maker: "DJI", cat: "mobile base", open: "closed", x: 2020.5, cost: 1099 },

  /* Closed commercial players that dominate drones, chassis (mobile bases) and dexterous hands */
  { name: "DJI Tello", maker: "Ryze / DJI", cat: "drone", open: "closed", x: 2018.04, cost: 99 },
  { name: "DJI Mavic 3", maker: "DJI", cat: "drone", open: "closed", x: 2021.83, cost: 2199 },
  { name: "Skydio 2+", maker: "Skydio", cat: "drone", open: "closed", x: 2022.5, cost: 1099 },
  { name: "DJI Matrice 350 RTK", maker: "DJI", cat: "drone", open: "closed", x: 2023.37, cost: 14999 },
  { name: "Clearpath Husky", maker: "Clearpath Robotics", cat: "mobile base", open: "closed", x: 2013.5, cost: 25000 },
  { name: "Clearpath Jackal", maker: "Clearpath Robotics", cat: "mobile base", open: "closed", x: 2015.37, cost: 20000 },
  { name: "AgileX Scout Mini", maker: "AgileX Robotics", cat: "mobile base", open: "closed", x: 2020.5, cost: 6900 },
  { name: "iRobot Create 3", maker: "iRobot", cat: "mobile base", open: "closed", x: 2022.29, cost: 300 },
  { name: "PSYONIC Ability Hand", maker: "PSYONIC", cat: "hand", open: "closed", x: 2021.5, cost: 13000 },
  { name: "SCHUNK SVH", maker: "SCHUNK", cat: "hand", open: "closed", x: 2014.5, cost: 45000 }
];

/* ---- Datasets: episodes vs. release date, grouped by method ----
   Source: bit.ly sheet 1g5c2uuD… The LeRobot-community aggregate
   row and rows without a reported episode count are excluded.     */
window.DATASETS = [
  { name: "ARIO (All Robots In One)", method: "Aggregated", x: 2024.58, ep: 3000000, sizeGB: null, note: "258 series, incl. simulation" },
  { name: "Open X-Embodiment (OXE)", method: "Aggregated", x: 2023.75, ep: 1000000, sizeGB: 4500, note: "60 datasets, 22 embodiments" },
  { name: "AgiBot World (Beta)", method: "Teleoperation", x: 2025.17, ep: 1001552, sizeGB: 43800, note: "100× AgiBot G1, single platform" },
  { name: "Language Table", method: "Teleoperation", x: 2022.75, ep: 600000, sizeGB: null, note: "xArm block-pushing, open vocab" },
  { name: "MT-Opt", method: "Scripted / self-sup.", x: 2021.25, ep: 800000, sizeGB: null, note: "7× KUKA farm" },
  { name: "RoboMIND 2.0", method: "Teleoperation", x: 2025.92, ep: 310000, sizeGB: null, note: "6 embodiments incl. 2 humanoids" },
  { name: "RoboNet", method: "Scripted / self-sup.", x: 2019.75, ep: 162000, sizeGB: 36, note: "7 embodiments, no task labels" },
  { name: "RT-1 / Fractal", method: "Teleoperation", x: 2022.92, ep: 130000, sizeGB: 111, note: "13× Everyday Robots" },
  { name: "RH20T", method: "Teleoperation", x: 2023.5, ep: 110000, sizeGB: 5000, note: "Contact-rich, vision+force+audio" },
  { name: "RoboMIND v1", method: "Teleoperation", x: 2024.92, ep: 107000, sizeGB: 1000, note: "4 embodiments incl. 1 humanoid" },
  { name: "FastUMI-100K", method: "Handheld", x: 2025.75, ep: 100000, sizeGB: 1400, note: "Handheld UMI gripper, no robot" },
  { name: "RoboSet (RoboAgent)", method: "Teleoperation", x: 2023.67, ep: 98500, sizeGB: 179, note: "Franka, teleop + kinesthetic" },
  { name: "DROID", method: "Teleoperation", x: 2024.17, ep: 76000, sizeGB: 1700, note: "Franka in-the-wild, 13 institutions" },
  { name: "BridgeData V2", method: "Teleoperation", x: 2023.58, ep: 60096, sizeGB: 400, note: "WidowX low-cost arm" },
  { name: "BC-Z", method: "Teleoperation", x: 2021.83, ep: 25877, sizeGB: 81, note: "Everyday Robots, 100 tasks" },
  { name: "FMB", method: "Teleoperation", x: 2024.0, ep: 22550, sizeGB: null, note: "Franka, RGB-D + force + audio" },
  { name: "Humanoid Everyday", method: "Teleoperation", x: 2025.75, ep: 10300, sizeGB: 500, note: "Unitree G1 & H1 humanoids" },
  { name: "Dobb-E", method: "Handheld", x: 2023.83, ep: 5620, sizeGB: 77, note: "Handheld 'Stick' in 22 NYC homes" },
  { name: "RoboTurk", method: "Teleoperation", x: 2019.83, ep: 2144, sizeGB: 45, note: "Crowdsourced Sawyer teleop" },
  { name: "DexWild", method: "Handheld", x: 2025.33, ep: 1395, sizeGB: null, note: "xArm + LEAP Hand, paired robot demos" },
  { name: "Mobile ALOHA", method: "Teleoperation", x: 2024.0, ep: 350, sizeGB: 47, note: "Bimanual mobile, high-quality" },
  { name: "L2D R0", method: "Human driving", x: 2025.17, ep: 100, sizeGB: 9.5, note: "Yaak × HF self-driving (release increment)" },
  { name: "L2D R1", method: "Human driving", x: 2025.25, ep: 900, sizeGB: 85.5, note: "self-driving (release increment)" },
  { name: "L2D R2", method: "Human driving", x: 2025.33, ep: 9000, sizeGB: 405, note: "self-driving (release increment)" },
  { name: "L2D R3", method: "Human driving", x: 2025.67, ep: 90000, sizeGB: 4500, note: "self-driving (release increment)" },
  { name: "L2D R4", method: "Human driving", x: 2025.83, ep: 900000, sizeGB: 85000, note: "self-driving (release increment)" }
];

/* ---- Hardware gap, class by class ----
   Cheapest open vs. cheapest closed in each class with a commercial
   incumbent. Source: comparison_classes analysis (17 classes total). */
window.GAP = [
  /* Fig 3 plots the rows flagged arm:true as a 5/6/7-DOF capability ladder,
     each open arm vs a commercial counterpart at the SAME DOF. */
  { cls: "5-DOF desktop arm",          closed: 200,   cN: "Waveshare RoArm-M3",    open: 110,  oN: "SO-100 (LeRobot)",    oDof: 5, cDof: 5, arm: true, badge: "open ~1.8× cheaper", status: "win" },
  { cls: "6-DOF low-cost cobot",       closed: 2499,  cN: "AgileX Piper",          open: 1197, oN: "Seeed reBot B601",    oDof: 6, cDof: 6, arm: true, badge: "open 2.1× cheaper",  status: "win" },
  { cls: "7-DOF research arm",         closed: 10449, cN: "UFactory xArm 7",       open: 3250, oN: "OpenArm (Enactic)",   oDof: 7, cDof: 7, arm: true, badge: "open 3.2× cheaper",  status: "win" },
  { cls: "Dexterous robotic hand",     closed: 4500,  cN: "Inspire Hand",          open: 200,  oN: "Amazing Hand",        oDof: 8, cDof: 6, badge: "open 22.5× cheaper",     status: "win" },
  { cls: "Research / dev quadruped",   closed: 1600,  cN: "Unitree Go2",           open: 3000, oN: "Stanford Doggo",      badge: "open costs 1.9× more",   status: "loss" },
  { cls: "Educational mobile platform",closed: 499,   cN: "DJI RoboMaster S1",     open: 590,  oN: "TurtleBot 3 Burger",  badge: "open ~18% pricier",      status: "loss" },
  { cls: "Full-size humanoid",         closed: 5900,  cN: "Unitree R1",            open: null, oN: null,                 badge: "no fully-open option",   status: "gap" },
  { cls: "Bimanual research platform", closed: 20000, cN: "ALOHA (closed arms)",   open: null, oN: null,                 badge: "designs open, builds aren't", status: "gap" },
  { cls: "Research teleoperation arm", closed: 3550,  cN: "Trossen WidowX 250 S",  open: null, oN: null,                 badge: "no open option yet",     status: "gap" },
  { cls: "Industrial quadruped",       closed: 74500, cN: "Boston Dynamics Spot",  open: null, oN: null,                 badge: "no open option yet",     status: "gap" }
];
