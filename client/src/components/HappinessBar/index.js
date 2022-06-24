import { useState, useEffect  } from "react";
import { ThreeDots } from  'react-loader-spinner'

import getStatus from "../../utils/getStatus";

import "./styles.scoped.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function HappinessBar() {
    function getHappinessLevel(happiness) {
        const intervals = [[0,1], [1,2], [2,3], [3,4], [4,6]]

        return intervals.findIndex((value) => {
            const [min, max] = value
            return (min <= happiness && happiness < max)
        })
    };

    function getHappinessName(level) {
        return ['Péssima', 'Triste', 'Regular', 'Feliz', 'Ótima'][level]
    };

    const [happiness, setHappiness] = useState({});

    useEffect(() => {
        async function buildHappiness() {
            const overall = await getStatus('overall');
            const level = getHappinessLevel(overall);
            const name = getHappinessName(level);

            return setHappiness({
                overall,
                level,
                name
            })
        }
        buildHappiness()
    }, []);

    function renderStatusLevels(happiness) {
        var levelsBar = [];

        for (let i=0; i<5; i++) {
            levelsBar.push(
                <div
                    key={"level" + i}
                    className={
                        "happiness-level " +
                        "level" + i +
                        (happiness.level === i ? " current-level" : "")
                    }
                >
                </div>
            )
        }
        return levelsBar
    }

    return (
        <div>
            <h2 className={"text-title name-level" + happiness.level}>
                {
                    !happiness.name ?
                        <ThreeDots color="#00BBFF" height={20} width={20} />
                        :
                        happiness.name
                }
            </h2>
            <div className="happiness-bar">
                {
                    !happiness.name ?
                        <ThreeDots color="#00BBFF" height={20} width={20} />
                        :
                        renderStatusLevels(happiness)
                }
            </div>
        </div>
    );
}

export default HappinessBar;
