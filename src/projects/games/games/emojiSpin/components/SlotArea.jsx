import React, { useMemo, useState } from 'react';
import { symbols } from '../core';
import Column from './Column';

const SlotArea = ({ result }) => {
	return (
		<section className="SlotArea">
			{result.columns.map(column => (
				<Column key={`column_${column.column}`} column={column} />
			))}
		</section>
	);
};

export default SlotArea;
