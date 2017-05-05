import React, { PropTypes, Component } from 'react';
import { Segment, Header, Table } from 'semantic-ui-react';

const AddressInput = require('@digix/spectrum/src/components/common/address_input').default;
const { isAddress } = require('@digix/spectrum/src/helpers/stringUtils');

export default class AddressSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }
  handleAddressChange({ target: { value: address } }) {
    const valid = isAddress(address);
    if (valid && address !== this.state.address) {
      const { contract } = this.props;
      contract.balanceOf.call(address);
      contract.redeemedOf.call(address);
    }
    this.setState({ valid, address });
  }
  render() {
    const { contract, data: { rate } } = this.props;
    const { valid, address } = this.state;
    const bal = valid && contract.balanceOf(address);
    const red = valid && contract.redeemedOf(address);
    const balanceOf = bal && bal.toNumber() && bal;
    const redeemedOf = red && red.toNumber() && red;
    return (
      <Segment>
        <AddressInput placeholder="Enter address to check info" onChange={this.handleAddressChange} value={address} />
        {valid && address && (
          <Table definition>
            <Table.Row positive={!!balanceOf}>
              <Table.Cell>DGDR Balanace</Table.Cell>
              <Table.Cell>{(balanceOf && <b>{balanceOf.div(1e9).toFormat(2)}</b>) || 0}</Table.Cell>
            </Table.Row>
            <Table.Row positive={!!balanceOf}>
              <Table.Cell>ETC Equivalent Balanace</Table.Cell>
              <Table.Cell>{(balanceOf && <b>{balanceOf.mul(rate).div(1e18).toFormat(2)}</b>) || 0}</Table.Cell>
            </Table.Row>
            <Table.Row positive={!!redeemedOf}>
              <Table.Cell>DGDR Redeemed</Table.Cell>
              <Table.Cell>{(redeemedOf && <b>{redeemedOf.div(1e8).toFormat(2)}</b>) || 0}</Table.Cell>
            </Table.Row>
          </Table>
        )}
      </Segment>
    );
  }
}

AddressSearch.propTypes = {
  contract: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
