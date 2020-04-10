import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const StyledCoverArt = styled.img`
	height: 150px;
	border: thin groove white;
`;

const StyledBookTitle = styled.text`white-space: normal;`;

const StyledShoppingCartTitle = styled.h3`
	font-variant: petite-caps;
	font-family: monospace;
	text-shadow: rgba(0, 0, 0, 0.7) 2px 4px;
	color: #fff;
	font-size: 40px;
	font-weight: lighter;
	padding-top: 10px;
	margin-bottom: 10px;
`;

const StyledSFLTitle = styled.h3`
	font-variant: petite-caps;
	font-family: monospace;
	text-shadow: rgba(0, 0, 0, 0.7) 2px 4px;
	color: #fff;
	font-size: 28px;
	font-weight: lighter;
	margin-bottom: 5px;
`;

const StyledSubtotal = styled.p`
	color: rgba(0, 0, 0, 0.54);
	font-size: 20px;
	text-transform: uppercase;
	margin: unset;
`;

const StyledTooltip = withStyles(() => ({
	tooltip: {
		maxWidth: 210,
		fontSize: 12
	}
}))(Tooltip);

export { StyledCoverArt, StyledBookTitle, StyledShoppingCartTitle, StyledSFLTitle, StyledSubtotal, StyledTooltip };
