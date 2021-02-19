export const TimeSigSelect = ({ setTimeSig }) => {

    return (
        <>
            <label htmlFor="selectTimeSig">Time signature</label>
            <select onChange={setTimeSig} name="selectTimeSig" id="selectTimeSig">
                <option value="4">4/4</option>
                <option value="3">3/4</option>
                <option value="5">5/4</option>
                <option value="7">7/4</option>
            </select>
        </>
    )
}