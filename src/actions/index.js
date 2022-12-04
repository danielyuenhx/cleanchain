import React from 'react';
import * as api from '../api/index';

export const getSamplePoints = async () => {
  try {
    const { data } = await api.getSamplePoints();

    return data;
  } catch (e) {
    return e;
  }
};

export const getSamplePoint = async () => {
  try {
    const { data } = await api.getSamplePoint();

    return data;
  } catch (e) {
    return e;
  }
};

export const closeBounty = async () => {
  try {
    const { data } = await api.closeBounty();

    return data;
  } catch (e) {
    return e;
  }
};

export const addBounty = async () => {
  try {
    const { data } = await api.addBounty();

    return data;
  } catch (e) {
    return e;
  }
};
