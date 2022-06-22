import { indexOf } from "lodash";
import getStatus from "../../utils/getStatus";
import "./styles.scoped.css";


function HappinessBar() {
    function getLevel(happiness) {
        const intervals = [(0,1), (1,2), (2,3), (3,4), (4,6)]

        return intervals.forEach((value) => {
            const [min, max] = value

            if (min <= happiness && happiness < max) {
                return indexOf(intervals, value)
            }
        })
    }

    function getName(level) {
        return ['Péssima', 'Triste', 'Regular', 'Feliz', 'Ótima'][level]
    }

    async function genHappiness() {
        const overall = await getStatus('overall');
        const level = getLevel(overall);
        const name = getName(level);

        return {
            overall,
            level,
            name
        }
    }

    function renderStatusLevels(happiness) {
        for (let i=0; i<5; i++) {
            <div
                id={"level" + i}
                className={"happiness-level " + (happiness.level === i ? "current-level" : "")}
            >
            </div>
        }
    }

    const happiness = (async () => await genHappiness())();

    return (
        <div>
            <h2>
                { happiness.name }
            </h2>
            <div>
                { renderStatusLevels(happiness) }
            </div>
        </div>
    );
}

export default HappinessBar;
