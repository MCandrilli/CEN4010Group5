import styled from 'styled-components';
import { withStyles} from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const StyledCoverArt = styled.img`height: 150px;`;

const StyledDeleteButton = styled.button`
	background: transparent;
	border: none;
`;

const StyledActionButton = styled.button`
	background: transparent;
	border-color: blue;
	border-width: thin;
	color: blue;
	text-decoration: underline;
`;

const StyledCheckoutButton = styled.button`
	background: darkblue;
	color: honeydew;
	border: outset;
	border-radius: 12px;
	padding: 5px 10px;
	font-variant-caps: all-petite-caps;
	font-size: 30px;
	font-weight: lighter;
	margin-left: 770px;
	margin-top: 50px;
`;

const StyledBookTitle = styled.text`white-space: normal;`;

const StyledShoppingCartTitle = styled.h3`
	font-variant: all-petite-caps;
	text-decoration: overline;
	color: dimgrey;
	font-size: 40px;
	font-weight: lighter;
	padding-top: 10px;
`;

const StyledSFLTitle = styled.h3`
	font-variant: all-petite-caps;
	text-decoration: overline;
	color: dimgrey;
	font-size: 28px;
	font-weight: lighter;
`;

const StyledSubtotal = styled.p`
	color: rgba(0, 0, 0, 0.54);
	font-size: 20px;
	text-transform: uppercase;
	margin: unset;
`;

const StyledTooltip = withStyles(() =>({
	tooltip: {
		maxWidth: 210,
		fontSize: 12
	}
}))(Tooltip)

export {
	StyledCoverArt,
	StyledDeleteButton,
	StyledActionButton,
	StyledBookTitle,
	StyledShoppingCartTitle,
	StyledSFLTitle,
	StyledSubtotal,
	StyledCheckoutButton,
	StyledTooltip
};
