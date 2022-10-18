import {Routes, Route, HashRouter} from "react-router-dom";
import {Container} from "react-bootstrap";
import TopHeader from "./components/TopHeader"
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import FashionScreen from "./screens/FashionScreen";
import BeautyScreen from "./screens/BeautyScreen";
import LifeStyleScreen from "./screens/LifeStyleScreen";
import PeopleScreen from "./screens/PeopleScreen";
import LoginScreen from "./screens/LoginScreen"
import ProfileScreen from "./screens/ProfileScreen";
import PostListScreen from "./screens/PostListScreen";
import PostEditScreen from "./screens/PostEditScreen";
import PostCreateScreen from "./screens/PostCreateScreen";

function App() {
    return (
        <HashRouter>
            <TopHeader/>
            <Header/>
            <main className='py-3'>
                <Container>
                    <Routes>
                        <Route path='/login' element={<LoginScreen/>}/>
                        <Route path='/profile' element={<ProfileScreen/>}/>

                        <Route path='/' element={<HomeScreen/>}/>
                        <Route path='/post/:id' element={<PostScreen/>}/>
                        <Route path='/post/fashion' element={<FashionScreen/>}/>
                        <Route path='/post/beauty' element={<BeautyScreen/>}/>
                        <Route path='/post/life' element={<LifeStyleScreen/>}/>
                        <Route path='/post/people' element={<PeopleScreen/>}/>

                        <Route path='/manager/postList' element={<PostListScreen/>}/>
                        <Route path='/manager/postCreate' element={<PostCreateScreen/>}/>
                        <Route path='/manager/post/:id/edit' element={<PostEditScreen/>}/>
                    </Routes>
                </Container>
            </main>
            <Footer/>
        </HashRouter>
    );
}

export default App;
