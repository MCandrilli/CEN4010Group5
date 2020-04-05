import { Card } from 'react-mdl';
import { Link } from 'react-router-dom';
import { DataTable } from 'react-mdl';
import { TrashFill } from 'react-bootstrap-icons';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styled from 'styled-components';

const StyledTitle = styled(Link)`
	font-size: 32px;
	font-variant: petite-caps;
	font-family: monospace;
	text-decoration: overline;
	padding-top: 15px;
	padding-left: 10px;
	color: #fff;
	&:hover{
	text-decoration: overline;
	color: #fff;`;

const StyledPageTitle = styled(Link)`
	color: #fff;    
	font-size: 28px;
	font-variant: all-petite-caps;
	font-family: monospace;`;

const StyledPageTitleStatic = styled.h3`
	font-variant: petite-caps;
	font-family: monospace;
	color: #fff;
	font-size: 40px;
	font-weight: lighter;
	padding-top: 10px;
	margin-bottom: 10px;
`;

const StyledSubtitleStatic = styled.h3`
	font-variant: all-petite-caps;
	font-family: monospace;
	color: #fff;
	font-size: 35px;
	font-weight: lighter;
	margin-bottom: 5px;
`;

const CardBW = styled(Card)`
	width: 360px;
	height: 720px;
	margin: 50px;
	transform: scale(0.85);
	background-color: rgba(0, 0, 0, 0.5);
	border: thin groove white;
	transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease;
	> * {
		color: #fff;
	}
	&:hover {
		background-color: rgba(255, 255, 255, 0.6);
		border-color: black;
		> * {
			color: black;
        }
	}
}`;

const styledButtonBW = {
	color: '#fff',
	backgroundColor: 'rgba(0, 0, 0, 0.4)',
	fontFamily: 'monospace',
	borderStyle: 'groove',
	borderWidth: 'thin',
	fontSize: '14px',
	fontWeight: '800',
	padding: '10px',
	margin: '5px',
	transition: 'backgroundColor 0.5s ease, color 0.5s ease, borderColor 0.5s ease'
};

const styledBWHover = {
	backgroundColor: 'rgba(255, 255, 255, 0.65)',
	color: 'black',
	borderColor: 'black'
};

const styledButtonAction = {
	color: '#fff',
	fontFamily: 'monospace',
	border: '#fff solid thin',
	fontSize: '24px',
	fontWeight: 'bolder',
	fontVariant: 'all-petite-caps',
	padding: '7px 10px',
	margin: '5px',
	transition: 'backgroundColor 0.5s ease, color 0.5s ease, borderColor 0.5s ease'
};

const ButtonBW = styled.button`
	${styledButtonBW};
	&:hover {
		${styledBWHover};
	}
`;

const ButtonBW2 = styled.button`
	${styledButtonBW};
	background-color: transparent;
	&:hover {
		${styledBWHover};
	}
`;

const ButtonBlue = styled.button`
	${styledButtonAction} background-color: dodgerblue;
	&:hover {
		background-color: darkslategrey;
		border-color: transparent;
	}
`;

const ButtonRed = styled.button`
	${styledButtonAction} background-color: rosybrown;
	&:hover {
		background-color: brown;
		border-color: transparent;
	}
`;

const ButtonRed2 = styled.button`
	${styledButtonAction} background-color: crimson;
	&:hover {
		background-color: brown;
		border-color: transparent;
	}
`;

const DropdownBW = styled(DropdownButton)`
	& > .btn-primary.dropdown-toggle {
		${styledButtonBW}
		border-color: #fff;
		border-radius: unset;
		&:hover {
			${styledBWHover}
		}
		&:focus{
			box-shadow: unset;
			${styledBWHover}
		}
	}
	& > .btn-primary {
		${styledButtonBW}
		border-color: #fff;
		border-radius: unset;
		&:hover {
			${styledBWHover}
		}		
	}
	& > .dropdown-menu {
		border-radius: unset;
		background-color: rgba(0, 0, 0, 0.8);
		border: #fff groove thin;
		& > .dropdown-item {
			color: #fff;
			border-bottom: #fff groove thin;
			font-family: monospace;
			font-size: 20px;
			font-weight: 700;
			font-variant: all-petite-caps;
			transition: backgroundColor 0.25s ease-out, color 0.25s ease-out;
			&:hover {
				color: black;
				background-color: rgba(255, 255, 255, 0.65);
			}
		}
	}`;

const DataTableBW = styled(DataTable)`
	background-color: rgba(0, 0, 0, 0.5);
	border: #fff groove thin;
	> * {
		color: #fff;
		font-family: monospace;
		font-size: 17px;
	}
	th {
		color: #fff;
	}
	p {
		color: #fff;
	}
	tr:first-child > td {
		border-top: rgba(255, 255, 255, 0.65) solid thin;
	}
	tr:last-child > td {
		border-bottom: rgba(255, 255, 255, 0.65) solid thin;
	}
	`;

const DataTableBW_Cart = styled(DataTable)`
	background-color: rgba(0, 0, 0, 0.5);
	border: #fff groove thin;
	> * {
		color: #fff;
		font-family: monospace;
		font-size: 17px;
	}
	th {
		color: #fff;
	}
	p {
		color: #fff;
	}
	tr:first-child > td {
		border-top: rgba(255, 255, 255, 0.65) solid thin;
	}
	tr:last-child > td {
		border-bottom: rgba(255, 255, 255, 0.65) solid thin;
		border-top: rgba(255, 255, 255, 0.3) solid 2px;
	}
	`;

const TrashIcon = styled(TrashFill)`
	&:hover{
		fill: darkgray;
	}`;

const QuantityStyle = styled.p`
	margin-bottom: unset;
	font-size: 17px;
	&:hover {
		color: darkgray;
		cursor: pointer;
	}
`;

export {
	StyledTitle,
	StyledPageTitle,
	StyledPageTitleStatic,
	StyledSubtitleStatic,
	CardBW,
	ButtonBW,
	ButtonBW2,
	ButtonBlue,
	ButtonRed,
	ButtonRed2,
	DropdownBW,
	DataTableBW,
	DataTableBW_Cart,
	TrashIcon,
	QuantityStyle
};
