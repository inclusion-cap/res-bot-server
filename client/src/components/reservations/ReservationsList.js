import React from 'react';

class ReservationsList extends React.Component {
    constructor() {
        super();
        this.state = { reservations: []}
    }

    componentDidMount() {
        fetch('/reservations').then(res => res.json()).catch(err => {console.error(err)}).then(reservations => this.setState({reservations}))
    }

    render() {
        let mapReservations = this.state.reservations.map(res => (<div key={res.id}>{res.name}</div>))
        return (
            <div>
                {mapReservations}
            </div>
        )
    }
}

export default ReservationsList