import React, { useEffect, useId, useMemo, useState } from "react";
import {
  Body1,
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Field,
  Input,
  Select,
  Spinner,
  TableCellLayout,
  TableColumnDefinition,
  Tab,
  TabList,
  Toast,
  ToastBody,
  ToastFooter,
  ToastTitle,
  Toaster,
  createTableColumn,
  useToastController,
} from "@fluentui/react-components";

type CustomerStatus = "Aktiv" | "Lead" | "Inaktiv";

type Customer = {
  id: number;
  name: string;
  email: string;
  status: CustomerStatus;
};

type CustomerView = "alle" | "aktiv" | "inaktiv";
type SortOption = "name-asc" | "name-desc" | "status";

const statusOptions: CustomerStatus[] = ["Aktiv", "Lead", "Inaktiv"];

const initialCustomers: Customer[] = [
  { id: 1, name: "Anna Weber", email: "anna.weber@example.com", status: "Aktiv" },
  { id: 2, name: "Lukas Berg", email: "lukas.berg@example.com", status: "Lead" },
];

export const App = () => {
  const toasterId = useId();
  const { dispatchToast } = useToastController(toasterId);

  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<CustomerStatus>("Lead");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [lastDeletedCustomer, setLastDeletedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState<CustomerView>("alle");
  const [sortOption, setSortOption] = useState<SortOption>("name-asc");

  const canSave = name.trim().length > 1 && email.includes("@");

  const resetForm = () => {
    setName("");
    setEmail("");
    setStatus("Lead");
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [activeView]);

  const handleSave = async () => {
    if (!canSave || isSaving) {
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setCustomers((prev) => [
      {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        status,
      },
      ...prev,
    ]);
    resetForm();
    setIsSaving(false);

    dispatchToast(
      <Toast>
        <ToastTitle>Kunde gespeichert</ToastTitle>
        <ToastBody>{name.trim()} wurde erfolgreich angelegt.</ToastBody>
      </Toast>,
      { intent: "success" },
    );
  };

  const confirmDelete = () => {
    if (!customerToDelete) {
      return;
    }

    const deletedCustomer = customerToDelete;
    setCustomers((prev) => prev.filter((entry) => entry.id !== deletedCustomer.id));
    setLastDeletedCustomer(deletedCustomer);
    dispatchToast(
      <Toast>
        <ToastTitle>Kunde geloescht</ToastTitle>
        <ToastBody>{deletedCustomer.name} wurde entfernt.</ToastBody>
        <ToastFooter>
          <Button appearance="transparent" size="small" onClick={() => undoDelete()}>
            Rueckgaengig
          </Button>
        </ToastFooter>
      </Toast>,
      { intent: "success" },
    );
    setCustomerToDelete(null);
  };

  const undoDelete = () => {
    if (!lastDeletedCustomer) {
      return;
    }

    setCustomers((prev) => [lastDeletedCustomer, ...prev]);
    dispatchToast(
      <Toast>
        <ToastTitle>Loeschen rueckgaengig</ToastTitle>
        <ToastBody>{lastDeletedCustomer.name} wurde wiederhergestellt.</ToastBody>
      </Toast>,
      { intent: "success" },
    );
    setLastDeletedCustomer(null);
  };

  const visibleCustomers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const statusRank: Record<CustomerStatus, number> = {
      Aktiv: 0,
      Lead: 1,
      Inaktiv: 2,
    };

    return customers
      .filter((entry) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          entry.name.toLowerCase().includes(normalizedSearch) ||
          entry.email.toLowerCase().includes(normalizedSearch);
        const matchesStatus =
          activeView === "alle" ||
          (activeView === "aktiv" && entry.status === "Aktiv") ||
          (activeView === "inaktiv" && entry.status === "Inaktiv");
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortOption === "name-asc") {
          return a.name.localeCompare(b.name, "de");
        }
        if (sortOption === "name-desc") {
          return b.name.localeCompare(a.name, "de");
        }
        const statusDiff = statusRank[a.status] - statusRank[b.status];
        return statusDiff !== 0 ? statusDiff : a.name.localeCompare(b.name, "de");
      });
  }, [customers, searchTerm, activeView, sortOption]);

  const columns: TableColumnDefinition<Customer>[] = [
    createTableColumn<Customer>({
      columnId: "name",
      renderHeaderCell: () => "Name",
      renderCell: (item) => <TableCellLayout>{item.name}</TableCellLayout>,
    }),
    createTableColumn<Customer>({
      columnId: "email",
      renderHeaderCell: () => "E-Mail",
      renderCell: (item) => item.email,
    }),
    createTableColumn<Customer>({
      columnId: "status",
      renderHeaderCell: () => "Status",
      renderCell: (item) => item.status,
    }),
    createTableColumn<Customer>({
      columnId: "action",
      renderHeaderCell: () => "Aktion",
      renderCell: (item) => (
        <Dialog open={customerToDelete?.id === item.id}>
          <DialogTrigger disableButtonEnhancement>
            <Button appearance="subtle" onClick={() => setCustomerToDelete(item)} disabled={isLoading || isSaving}>
              Loeschen
            </Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Eintrag wirklich loeschen?</DialogTitle>
              <DialogContent>{item.name} wird dauerhaft aus der Liste entfernt.</DialogContent>
              <DialogActions>
                <Button appearance="secondary" onClick={() => setCustomerToDelete(null)}>
                  Abbrechen
                </Button>
                <Button appearance="primary" onClick={confirmDelete}>
                  Loeschen bestaetigen
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      ),
    }),
  ];

  return (
    <main className="page">
      <h1>Mini-App: Kundenverwaltung</h1>

      <section className="card">
        <h2>Neuen Kunden erfassen</h2>
        <div className="formGrid">
          <Field label="Name" required>
            <Input
              value={name}
              onChange={(_, data) => setName(data.value)}
              placeholder="z. B. Maria Klein"
            />
          </Field>

          <Field label="E-Mail" required hint={email && !email.includes("@") ? "Bitte gueltige E-Mail" : undefined}>
            <Input
              value={email}
              onChange={(_, data) => setEmail(data.value)}
              type="email"
              placeholder="name@firma.de"
            />
          </Field>

          <Field label="Status">
            <Select
              value={status}
              onChange={(event) => setStatus(event.target.value as CustomerStatus)}
            >
              {statusOptions.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="actionsRow">
          <Button appearance="primary" onClick={handleSave} disabled={!canSave || isSaving || isLoading}>
            Speichern
          </Button>
          {isSaving ? <Spinner size="tiny" label="Speichern..." /> : null}
        </div>
      </section>

      <section className="card">
        <h2>Kundenliste</h2>
        <TabList
          selectedValue={activeView}
          onTabSelect={(_, data) => setActiveView(data.value as CustomerView)}
          appearance="subtle"
          className="tabsRow"
        >
          <Tab value="alle">Alle Eintraege</Tab>
          <Tab value="aktiv">Aktive Eintraege</Tab>
          <Tab value="inaktiv">Inaktive Eintraege</Tab>
        </TabList>

        <div className="listControls">
          <Field label="Suche" className="controlField">
            <Input
              value={searchTerm}
              onChange={(_, data) => setSearchTerm(data.value)}
              placeholder="Nach Name oder E-Mail suchen"
            />
          </Field>

          <Field label="Sortierung" className="controlField">
            <Select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value as SortOption)}
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="status">Status</option>
            </Select>
          </Field>
        </div>

        {isLoading ? (
          <div className="loadingState">
            <Spinner label="Daten werden geladen..." />
          </div>
        ) : visibleCustomers.length === 0 ? (
          <Body1 className="emptyState">Keine Kunden fuer die aktuelle Suche/Filter gefunden.</Body1>
        ) : (
          <DataGrid items={visibleCustomers} columns={columns} focusMode="composite" sortable={false}>
            <DataGridHeader>
              <DataGridRow>
                {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
              </DataGridRow>
            </DataGridHeader>
            <DataGridBody<Customer>>
              {({ item, rowId }) => (
                <DataGridRow<Customer> key={rowId}>
                  {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
                </DataGridRow>
              )}
            </DataGridBody>
          </DataGrid>
        )}
      </section>

      <section className="card">
        <h2>UX-Entscheidungen</h2>
        <Body1>
          Speichern bleibt deaktiviert, bis sinnvolle Eingaben vorhanden sind. Das senkt Fehler fruehzeitig.
        </Body1>
        <Body1>
          Der Spinner zeigt asynchrone Arbeit transparent an. Der Toast bestaetigt erfolgreiche Aktionen ohne den Flow zu unterbrechen.
        </Body1>
        <Body1>
          Das Loeschen nutzt einen bestaetigenden Dialog, weil dieser Schritt nicht rueckgaengig ist.
        </Body1>
      </section>

      <Toaster toasterId={toasterId} />
    </main>
  );
};
