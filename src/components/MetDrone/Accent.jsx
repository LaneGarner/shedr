export const Accent = ({ handleAccentChange }) => {
    return (
        <div>
            <input type="checkbox" id="checkbox" value="accent" onChange={handleAccentChange} />
            <label htmlFor="Accent">Accent</label>
        </div>
    )
}
