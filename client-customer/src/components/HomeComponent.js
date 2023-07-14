import React from 'react';
import HotProducts from './HotProducts'
import NewProducts from './NewProducts'
import PicCategories from './PictureCategoryComponent';
// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       newprods: [],
//       hotprods: []
//     };
//   }
//   render() {
//     return (
//       <div className='Home'>
//         <HotProducts type = 'Hot'/>
//         <NewProducts type = 'New' />  
//       </div>
//     );
//   }

// }
// export default Home;
function Home() {
  return (
    <div className='Home'>
      <div className='container'>
        <div className='HomeDIV'>
          <HotProducts type='Hot' />
          <PicCategories />
          <NewProducts type='New' />
        </div>
      </div>
    </div>
  );
}

export default Home;