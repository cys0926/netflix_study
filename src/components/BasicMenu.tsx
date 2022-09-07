import { Button, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'

function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className="md:hidden">
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="!capitalize !text-white"
            >
                메뉴
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="menu"
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <MenuItem onClick={handleClose}>홈</MenuItem>
                <MenuItem onClick={handleClose}>시리즈</MenuItem>
                <MenuItem onClick={handleClose}>영화</MenuItem>
                <MenuItem onClick={handleClose}>New! 요즘 대세 콘텐츠</MenuItem>
                <MenuItem onClick={handleClose}>내가 찜한 콘텐츠</MenuItem>
            </Menu>
        </div>
    )
}

export default BasicMenu
