export interface MenuItem {
  name: string,
  role: string,
  icon: string,
  endpoint: string
}

export const MenuList: MenuItem[] = [
  {
    name: "Chi tiết thu chi",
    role: "USER",
    icon: "icon",
    endpoint: "/"
  },
  {
    name: "Tạo phiếu",
    role: "ADMIN",
    icon: "icon",
    endpoint: "/create-bill"

  }
]

export interface IDropdownType {
  value: string,
  label: string
}