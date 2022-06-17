import "./styles.scoped.css";


function HappinessBar(props) {
    const happiness = props.props

    const statusLevels = (h) => {
        for (let i=0; i<5; i++) {
            <div
                id={"level" + i}
                className={"happiness-level" + (h.level === i ? "currLevel" : "")}
            >
            </div>
        }
    }

    return (
        <div>
            <h2>
                { happiness.name }
            </h2>
            <div>
                { statusLevels(happiness) }
            </div>
        </div>
    );
}

export default HappinessBar;
