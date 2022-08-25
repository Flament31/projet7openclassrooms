import Log from "../../components/Log";

const Connexion = () => {


    return (      
            <div className="card bg-dark mx-auto my-3 container border-dark rounded py-3 text-white" style={{ width: "25rem" }}>
                <div className="card-body">
                     <Log signin={true} signup={false} />                   
                </div>
            </div>    
    );
};

export default Connexion;