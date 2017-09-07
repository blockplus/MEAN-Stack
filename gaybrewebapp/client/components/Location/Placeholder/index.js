import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { addPlace } from 'client/actions/locations';

const mapDispatchToProps = (dispatch) => {
  return {
    addLocation() {
      dispatch(addPlace());
    },
  };
};

class PlaceholderClass extends Component {
  static propTypes = {
    addLocation: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div className="addLocation">
        <div className="addImg"><img src="img/add-location.jpg" alt="" /></div>
        <div className="addBtn">
          <table width="100%" height="100%" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
                <tr>
                  <td>
                    <a className="btn btn-primary" onClick={this.props.addLocation}>
                      ADD LOCATION
                    </a>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const Placeholder = connect(
  null,
  mapDispatchToProps
)(PlaceholderClass);

export default Placeholder;
