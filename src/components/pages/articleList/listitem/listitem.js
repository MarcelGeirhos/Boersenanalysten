// css imports
import './Listitem.css';

// TODO
const Listitem = (props) => {
    return (
        <div className="listitem">
            {/* TODO key={props.key} implementieren in li Element? */}
            <li>
                {/* TODO durch Daten aus der Datenbank ersetzen */}
                <p>[5] Voting [3] Antworten [58] Ansichten</p>
                <p>[Beitragstitel]</p>
                <p>[Tags]</p>
            </li>
        </div>
    );
}

export default Listitem;