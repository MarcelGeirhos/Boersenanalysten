// css imports
import './Listitem.css';

const Listitem = (props) => {
    return (
        <div className="listitem">
            {/* TODO key={props.key} implementieren in li Element? */}
            <li>
                <p>{props.voting} Voting {props.answerCounter} Antworten {props.views} Ansichten</p>
                <p>{props.title}</p>
                <p>{props.tags}</p>
            </li>
        </div>
    );
}

export default Listitem;