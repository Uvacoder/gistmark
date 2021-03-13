import React, { useContext } from "react"
import Button from "./common/Button"
import IconButton from "./common/IconButton"
import MenuIcon from "./icons/MenuIcon"
import { AuthContext, LayoutContext } from "~/context"
import { dev } from "~/helpers/isDev"

const Header: React.FC = () => {
  const layoutContext = useContext(LayoutContext)
  const authContext = useContext(AuthContext)
  const buttonText = layoutContext.createPanelOpen
    ? "Close Window"
    : "Create Bookmark"

  const handleAuth = () => {
    if (authContext.isLoggedIn) {
      authContext.logout()
    } else {
      alert("Stub for navigation")
      console.log("Fix this @: Header.tsx")
    }
  }

  return (
    <div className="border h-12 flex flex-row justify-between items-center px-4">
      <div className="flex flex-row items-center">
        <IconButton onClick={layoutContext.toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <p className="text-lg font-bold">GistMarks</p>
      </div>
      <div>
        {dev && (
          <Button
            onClick={layoutContext.toggleDevModal}
            label={"Debug"}
            additionalClassnames="w-36 mx-2"
          />
        )}
        <Button
          onClick={handleAuth}
          label={authContext.isLoggedIn ? "Log Out" : "Log In"}
          additionalClassnames="w-36 mx-2"
        />
        <Button
          onClick={layoutContext.toggleCreatePanel}
          label={buttonText}
          additionalClassnames="w-36"
        />
      </div>
    </div>
  )
}

export default Header
