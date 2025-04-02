import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function TopCustomers() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Pedidos</TableHead>
          <TableHead>Gasto Total</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-2">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Juan Pérez</div>
                <div className="text-sm text-muted-foreground">juan.perez@email.com</div>
              </div>
            </div>
          </TableCell>
          <TableCell>24</TableCell>
          <TableCell>$4,325.00</TableCell>
          <TableCell>
            <Badge className="bg-green-500">VIP</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-2">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Ana Martínez</div>
                <div className="text-sm text-muted-foreground">ana.martinez@email.com</div>
              </div>
            </div>
          </TableCell>
          <TableCell>18</TableCell>
          <TableCell>$3,752.00</TableCell>
          <TableCell>
            <Badge className="bg-green-500">VIP</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-2">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>CG</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Carlos González</div>
                <div className="text-sm text-muted-foreground">carlos.gonzalez@email.com</div>
              </div>
            </div>
          </TableCell>
          <TableCell>15</TableCell>
          <TableCell>$2,890.00</TableCell>
          <TableCell>
            <Badge>Regular</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-2">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Laura Rodríguez</div>
                <div className="text-sm text-muted-foreground">laura.rodriguez@email.com</div>
              </div>
            </div>
          </TableCell>
          <TableCell>12</TableCell>
          <TableCell>$2,150.00</TableCell>
          <TableCell>
            <Badge>Regular</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-2">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>MF</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Miguel Fernández</div>
                <div className="text-sm text-muted-foreground">miguel.fernandez@email.com</div>
              </div>
            </div>
          </TableCell>
          <TableCell>10</TableCell>
          <TableCell>$1,875.00</TableCell>
          <TableCell>
            <Badge>Regular</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

