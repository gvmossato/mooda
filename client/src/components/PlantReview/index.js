import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import HappinessBar from '../HappinessBar'

import "./styles.scoped.css";


function PlantReview(props) {
    const {status, happiness} = props.props

    return (
        <aside>
            <img src="" alt="mooda-logo" />
            <div>
                <img src="" alt="plant-pic"/>

                { <HappinessBar props={ happiness } /> }

                {
                    status.map(el => { return (
                        <div id={el.id}>
                            <p>{el.name}</p>
                            <p className={"icon" + (el.isFine ? 'check' : 'cross')}>
                                { el.isFine ? <BsCheckCircleFill /> : <BsXCircleFill /> }
                            </p>
                        </div>
                    )})
                }
            </div>
        </aside>
    );
}

export default PlantReview;
