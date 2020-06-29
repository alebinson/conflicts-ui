import React from 'react';
import { PolygonDrawingUi } from './polygon-drawing-ui';
import { DateFilter } from './date-filter';
import { HasResolvedFilter } from './has-resolved-filter';

export const SearchFilter: React.FC = () => {
  return (<div className="flex-container"><PolygonDrawingUi /><DateFilter /><HasResolvedFilter /></div>)
}