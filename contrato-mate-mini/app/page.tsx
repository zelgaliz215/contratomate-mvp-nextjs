import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-zinc-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-zinc-200 lg:p-4 lg:dark:bg-zinc-800/30">
          ContratoMate Mini&nbsp;
          <code className="font-mono font-bold">MVP</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Badge variant="outline" className="text-lg py-1 px-4">Beta v0.1</Badge>
        </div>
      </div>

      <div className="relative flex place-items-center w-full max-w-5xl py-10">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="contractors">Contratistas</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Contratos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    +2 desde el mes pasado
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Activos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+5</div>
                  <p className="text-xs text-muted-foreground">
                    +18% del mes pasado
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-1">
              <Card>
                <CardHeader>
                  <CardTitle>Crear Nuevo Contratista</CardTitle>
                  <CardDescription>
                    Formulario de ejemplo usando componentes UI.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">Tipo de Persona</Label>
                        <Select>
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="natural">Natural</SelectItem>
                            <SelectItem value="juridica">Jurídica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" placeholder="Juan Pérez" />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Guardar</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contractors">
            <Card>
              <CardHeader>
                <CardTitle>Contratistas Recientes</CardTitle>
                <CardDescription>
                  Listado de contratistas registrados en el sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Lista de tus contratistas recientes.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">CNT-001</TableCell>
                      <TableCell>Acme Corp</TableCell>
                      <TableCell>Jurídica</TableCell>
                      <TableCell className="text-right"><Badge>Activo</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CNT-002</TableCell>
                      <TableCell>Juan Silva</TableCell>
                      <TableCell>Natural</TableCell>
                      <TableCell className="text-right"><Badge variant="secondary">Inactivo</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CNT-003</TableCell>
                      <TableCell>Tech Solutions</TableCell>
                      <TableCell>Jurídica</TableCell>
                      <TableCell className="text-right"><Badge>Activo</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
