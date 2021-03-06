import React from 'react'
import ConflictItem from './conflict-item'
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { IConflict } from '../models/conflictStore';

const conflict: IConflict = {
  id: "7e73d05b-8159-4e51-a302-78aa6b8fbd97",
  source_server: "server1",
  target_server: "server2",
  source_entity: {},
  target_entity: {},
  description: "some desc 1",
  has_resolved: false,
  resolved_at: null,
  location: { type: "Point", "coordinates": [35.2137, 31.7683] },
  resolution_id: null,
  created_at: new Date(1234567890),
  updated_at: new Date(1234567891),
  deleted_at: null
}

it('renders correctly', () => {
  // const store = rootStore.create({}, { fetch: conflictFetcher })
  const tree = renderer
    .create(<ConflictItem conflict={conflict} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls handle select when div is clicked', () => {
  const onSelectMock = jest.fn();
  const wrapper = shallow(<ConflictItem conflict={conflict} onSelected={onSelectMock} />);
  wrapper.find('div').first().simulate('click', { preventDefault: () => { } });
  expect(onSelectMock).toHaveBeenCalledTimes(1);
  expect(onSelectMock).toHaveBeenCalledWith(conflict)
})