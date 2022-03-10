import Log from "../../components/Log";

const Home = () => {


    return (
               
        <div className="main">
            <div className="card">
                <div className="card-body">
                     <Log signin={true} signup={false} />                   
                </div>
            </div>    
        </div>
    );
};

export default Home;