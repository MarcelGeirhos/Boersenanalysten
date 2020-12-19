// css imports
import './listitem.css';

const Listitem = (props) => {
    return (
        <div className="listitem">
            <li key={props.key}>
                <p>[5] Voting [3] Antworten [58] Ansichten</p>
                <p>[Beitragstitel]</p>
                <p>[Tags]</p>
            </li>
        </div>
    );
}

export default Listitem;