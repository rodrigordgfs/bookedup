import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import React from 'react';

interface WorkingHours {
  [key: string]: {
    open: string;
    close: string;
    enabled: boolean;
  };
}

interface SettingsWorkingHoursProps {
  workingHours: WorkingHours;
  setWorkingHours: (hours: WorkingHours) => void;
  dayNames: { [key: string]: string };
  onSave: () => void;
}

export default function SettingsWorkingHours({ workingHours, setWorkingHours, dayNames, onSave }: SettingsWorkingHoursProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Horários de Funcionamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(workingHours).map(([day, hours]) => (
          <div key={day} className="p-4 border border-border rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Switch
                  checked={hours.enabled}
                  onCheckedChange={(checked) =>
                    setWorkingHours({
                      ...workingHours,
                      [day]: { ...hours, enabled: checked }
                    })
                  }
                />
                <span className="font-medium min-w-[120px]">{dayNames[day]}</span>
              </div>
              {hours.enabled && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:space-x-2">
                  <Input
                    type="time"
                    value={hours.open}
                    onChange={(e) =>
                      setWorkingHours({
                        ...workingHours,
                        [day]: { ...hours, open: e.target.value }
                      })
                    }
                    className="w-full sm:w-24"
                  />
                  <span className="hidden sm:inline">às</span>
                  <Input
                    type="time"
                    value={hours.close}
                    onChange={(e) =>
                      setWorkingHours({
                        ...workingHours,
                        [day]: { ...hours, close: e.target.value }
                      })
                    }
                    className="w-full sm:w-24"
                  />
                </div>
              )}
              {!hours.enabled && (
                <span className="text-muted-foreground">Fechado</span>
              )}
            </div>
          </div>
        ))}
        <Button onClick={onSave}>Salvar Horários</Button>
      </CardContent>
    </Card>
  );
} 