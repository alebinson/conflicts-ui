import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { DateTimeRangePicker } from './date-range-picker';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import { act } from '@testing-library/react';
import { Wrapper } from '@material-ui/pickers/wrappers/Wrapper';

const date = new Date(1990, 1, 1);

it('set the values of to and from to the props of the date pickers when changed', () => {
  const wrapper = mount(<DateTimeRangePicker onChange={() => {}} />);
  wrapper.setProps({ from: date, to: date });

  wrapper.update();
  const pickers = wrapper.find(KeyboardDateTimePicker);
  const fromRangePicker = pickers.first();
  const toRangePicker = pickers.at(1);

  expect(fromRangePicker.prop('value')?.valueOf()).toBe(date.getTime());
  expect(toRangePicker.prop('value')?.valueOf()).toBe(date.getTime());
});

it('calls on change when button is clicked', () => {
  const onChangeMock = jest.fn();
  const wrapper = mount(
    <DateTimeRangePicker from={date} to={date} onChange={onChangeMock} />
  );
  const button = wrapper.find(Button);

  // @ts-ignore
  wrapper.find(Button).props().onClick?.();

  expect(onChangeMock).toBeCalledWith({ from: date, to: date });

  wrapper.setProps({ to: null });
  wrapper.update();

  // @ts-ignore
  wrapper.find(Button).props().onClick?.();
  expect(onChangeMock).toBeCalledWith({ from: date });

  wrapper.setProps({ to: date, from: null });
  wrapper.update();

  // @ts-ignore
  wrapper.find(Button).props().onClick?.();
  expect(onChangeMock).toBeCalledWith({ to: date });
});

it('enables and disables the button based on the validity of the dates', () => {
  const wrapper = shallow(<DateTimeRangePicker onChange={() => {}} />);
  const fromPicker = wrapper.find(KeyboardDateTimePicker).first();
  const toPicker = wrapper.find(KeyboardDateTimePicker).at(1);

  expect(wrapper.find(Button).prop('disabled')).toBe(true);

  fromPicker.prop('onChange')(date);
  wrapper.update();

  expect(wrapper.find(Button).prop('disabled')).toBe(false);

  toPicker.prop('onChange')(date);
  wrapper.update();

  expect(wrapper.find(Button).prop('disabled')).toBe(true);

  toPicker.prop('onChange')(new Date(1994,1));
  wrapper.update();

  expect(wrapper.find(Button).prop('disabled')).toBe(false);
});
