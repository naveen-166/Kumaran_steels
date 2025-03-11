// import React from 'react'

// function Products() {
//     return (
//         <div className=' flex justify-center items-center h-screen'>
//             <div className=' rounded-lg bg-black h-[43rem] w-[68rem] bg-opacity-70 shadow-2xl shadow-black flex justify-center items-center'>
//                 <div className='flex'>
//                     <div className='flex flex-col pl-3 pt-3 space-y-3'>{/*first col */}
//                         <div className='bg-white h-[14rem] w-48 rounded-lg flex items-center '>
//                             <img className='' src="https://tatatiscon.co.in/samajhdar-banein-behtar-chunein/images/tata-tiscon-logo.png" alt="" />
//                         </div>
//                         <div className='bg-white h-[10rem] w-48 rounded-lg flex justify-center'>
//                             <img className='size-40' src="https://5.imimg.com/data5/ANDROID/Default/2022/11/MU/EO/EF/54440828/product-jpeg.jpg" alt="" />

//                         </div>
//                         <div className='h-[13rem] bg-white w-48 rounded-lg flex items-center'>
//                             <img className='h-40 w-60' width={20} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOfjGEHBJsyOYg71h4ULLwUjJW1emvC-yB0w&s" alt="" />
//                         </div>


//                     </div>
//                     <div className='flex flex-col pl-3 pt-3 space-y-3'>{/*second col */}
//                         <div className='bg-white h-[10rem] w-48 rounded-lg flex items-center '>
//                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCKwuIE6dRC6k_tm36OvuBB2nAITW4Xk4mgg&s" alt="" />
//                         </div>
//                         <div className='bg-white h-[17rem] w-48 rounded-lg flex justify-center items-center'>
//                             <img className='w-44 h-64 rounded-md'  src="https://5.imimg.com/data5/SELLER/Default/2022/8/EJ/EA/UI/64828884/priya-cement-grade-43-500x500.png" alt="" />
//                         </div>
//                         <div className='h-[10rem] bg-white w-48 rounded-lg flex items-center'>
//                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQN1vJ7Pdo0b5YklRP62AJCkjqbNUQncXfYA&s" alt="" />
//                         </div>


//                     </div>
//                     <div className='flex flex-col pl-3 pt-3 space-y-3'>{/*first col */}
//                         <div className='bg-white h-[14rem] w-48 rounded-lg flex items-center justify-center'>
//                             <img className='w-44 rounded-lg' src="https://5.imimg.com/data5/SELLER/Default/2023/12/371248014/IP/LI/JB/18773330/prime-gold-tmt-bars.png" alt="" />
//                         </div>
//                         <div className='bg-white h-[10rem] w-48 rounded-lg flex items-center'>
//                             <img className='' src="https://5.imimg.com/data5/TP/JK/QV/SELLER-7475143/govaan-tmt-500x500.jpg" alt="" />

//                         </div>
//                         <div className='h-[13rem] bg-white w-48 rounded-lg'>
//                             <img src="https://ngatmt.com/wp-content/uploads/2018/09/NGA-TMT_Logo_2-01.png" alt="" />
//                         </div>


//                     </div>
//                     <div className='flex flex-col pl-3 pt-3 space-y-3'>{/*second col */}
//                         <div className='bg-white h-[10rem] w-48 rounded-lg  flex justify-center items-center'>
//                             <img className='h-40' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdMSKpH0UzD9Sj5lsw8rkOtTJ2McWqlLAfTA&s" alt="" />

//                         </div>
//                         <div className='bg-white h-[17rem] w-48 rounded-lg flex justify-center items-center'>
//                             <img className='h-[16rem] w-[11.1rem] rounded-md' src="https://images.jdmagicbox.com/quickquotes/images_main/ramco-cement-375601565-wi5ay.jpg" alt="" />
//                         </div>
//                         <div className='h-[10rem] bg-white w-48 rounded-lg flex justify-center items-center'>
//                             <img className=' h-[9rem] w-[10.8rem] rounded-md ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiDyBl_Qji7H07TzoLvY6C74yYfp50Zj9ovg&s" alt="" />
//                         </div>


//                     </div>
//                     <div className='flex flex-col pl-3 pt-3 space-y-3'>{/*first col */}
//                         <div className='bg-white h-[14rem] w-48 rounded-lg overflow-hidden '>
//                             <img  src="https://www.tatasteel.com/media/3396/ts_logo_guidelines03.jpg" alt="" />
//                         </div>
//                         <div className='bg-white h-[10rem] w-48 rounded-lg overflow-hidden flex items-center'>
//                             <img src="https://seekvectorlogo.com/wp-content/uploads/2019/12/dalmia-bharat-group-vector-logo.png" alt="" />
//                         </div>
//                         <div className='h-[13rem] bg-white w-48 rounded-lg overflow-hidden flex items-center justify-center'>
//                             <img className='w-[11rem] h-[12rem] rounded-sm' src="https://5.imimg.com/data5/SELLER/Default/2022/6/LG/MC/OT/54449164/acc-600.png" alt="" />
//                         </div>


//                     </div>
//                 </div>


//             </div>

//         </div>
//     )
// }

// export default Products

import React from 'react';

function Products() {
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900 p-6'>
            <div className='rounded-lg shadow-2xl shadow-black p- w-full max-w-6xl'>
                <div className='grid grid-cols-5 gap-4'>
                    {productImages.map((img, index) => (
                        <div key={index} className='bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105'>
                            <img className='w-full h-48 object-contain p-2' src={img} alt={`Product ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const productImages = [
    "https://tatatiscon.co.in/samajhdar-banein-behtar-chunein/images/tata-tiscon-logo.png",
    "https://5.imimg.com/data5/ANDROID/Default/2022/11/MU/EO/EF/54440828/product-jpeg.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOfjGEHBJsyOYg71h4ULLwUjJW1emvC-yB0w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCKwuIE6dRC6k_tm36OvuBB2nAITW4Xk4mgg&s",
    "https://5.imimg.com/data5/SELLER/Default/2022/8/EJ/EA/UI/64828884/priya-cement-grade-43-500x500.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQN1vJ7Pdo0b5YklRP62AJCkjqbNUQncXfYA&s",
    "https://5.imimg.com/data5/SELLER/Default/2023/12/371248014/IP/LI/JB/18773330/prime-gold-tmt-bars.png",
    "https://5.imimg.com/data5/TP/JK/QV/SELLER-7475143/govaan-tmt-500x500.jpg",
    "https://ngatmt.com/wp-content/uploads/2018/09/NGA-TMT_Logo_2-01.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdMSKpH0UzD9Sj5lsw8rkOtTJ2McWqlLAfTA&s",
    "https://images.jdmagicbox.com/quickquotes/images_main/ramco-cement-375601565-wi5ay.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiDyBl_Qji7H07TzoLvY6C74yYfp50Zj9ovg&s",
    "https://www.tatasteel.com/media/3396/ts_logo_guidelines03.jpg",
    "https://seekvectorlogo.com/wp-content/uploads/2019/12/dalmia-bharat-group-vector-logo.png",
    "https://5.imimg.com/data5/SELLER/Default/2022/6/LG/MC/OT/54449164/acc-600.png",
];

export default Products;
