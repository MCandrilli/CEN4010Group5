import { Card } from 'react-mdl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styled from 'styled-components';

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

const ButtonBlue = styled.button`
	${styledButtonAction} background-color: dodgerblue;
	&:hover {
		background-color: darkslategrey;
		border-color: transparent;
	}
`;

const ButtonGreen = styled.button`
	${styledButtonAction} background-color: rosybrown;
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

export { CardBW, ButtonBW, ButtonBlue, ButtonGreen, DropdownBW };
