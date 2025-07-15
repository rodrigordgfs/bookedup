'use client';

import { useState, useEffect } from 'react';
import type { StaffMember } from '@/mocks/data';
import { staff } from '@/mocks/data';
import StaffTable from '@/components/staff/StaffTable';
import StaffListHeader from '@/components/staff/StaffListHeader';
import StaffFilters from '@/components/staff/StaffFilters';
import StaffDetailsDialog from '@/components/staff/StaffDetailsDialog';
import EditStaffDialog from '@/components/staff/EditStaffDialog';
import NewStaffDialog from '@/components/staff/NewStaffDialog';
import NoStaffCard from '@/components/staff/NoStaffCard';

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isStaffDetailsOpen, setIsStaffDetailsOpen] = useState(false);
  const [isEditStaffOpen, setIsEditStaffOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    specialties: [] as string[],
    workingHours: ''
  });
  const [editStaff, setEditStaff] = useState({
    name: '',
    email: '',
    phone: '',
    specialties: [] as string[],
    workingHours: ''
  });
  const [loading, setLoading] = useState(false); // Estado de loading

  // Simula o loading ao montar a página
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddStaff = () => {
    console.log('Adding staff:', newStaff);
    setIsAddStaffOpen(false);
    setNewStaff({ name: '', email: '', phone: '', specialties: [] as string[], workingHours: '' });
  };

  const handleStaffClick = (member: StaffMember) => {
    setSelectedStaff(member);
    setIsStaffDetailsOpen(true);
  };

  const handleEditStaff = () => {
    if (selectedStaff) {
      setEditStaff({
        name: selectedStaff.name,
        email: selectedStaff.email,
        phone: selectedStaff.phone,
        specialties: selectedStaff.specialties,
        workingHours: selectedStaff.workingHours
      });
      setIsStaffDetailsOpen(false);
      setIsEditStaffOpen(true);
    }
  };

  const handleSaveEditStaff = () => {
    console.log('Saving edited staff:', editStaff);
    // Implementar lógica de salvamento
    setIsEditStaffOpen(false);
    setEditStaff({ name: '', email: '', phone: '', specialties: [] as string[], workingHours: '' });
  };

  const handleDeleteStaff = () => {
    console.log('Deleting staff:', selectedStaff);
    setIsStaffDetailsOpen(false);
    setSelectedStaff(null);
  };

  const handleToggleStatus = () => {
    console.log('Toggling status for staff:', selectedStaff);
    // Implementar lógica de alteração de status
  };

  // specialties extraídas dos dados mockados
  const specialties = Array.from(new Set(staff.flatMap(s => s.specialties)));
  const [specialtyFilter, setSpecialtyFilter] = useState('all');

  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.specialties.some((specialty: string) => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && member.active) ||
      (statusFilter === 'inactive' && !member.active);
    const matchesSpecialty = specialtyFilter === 'all' || member.specialties.includes(specialtyFilter);
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStaff = filteredStaff.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Funcionários</h2>
            <p className="text-muted-foreground">Gerencie sua equipe de profissionais</p>
          </div>
          <NewStaffDialog
            open={isAddStaffOpen}
            onOpenChange={setIsAddStaffOpen}
            newStaff={newStaff}
            setNewStaff={setNewStaff}
            handleAddStaff={handleAddStaff}
            specialties={specialties}
          />
        </div>
        {/* Filtros */}
        <StaffFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          specialtyFilter={specialtyFilter}
          setSpecialtyFilter={setSpecialtyFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          loading={loading}
          specialties={specialties}
        />
        {/* Header da lista */}
        <div className="mb-2 mt-6">
          <StaffListHeader
            title="Lista de Funcionários"
            startIndex={startIndex}
            endIndex={endIndex}
            totalCount={filteredStaff.length}
          />
        </div>
        {/* Tabela de funcionários */}
        <StaffTable
          staff={currentStaff}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalCount={filteredStaff.length}
          onPageChange={handlePageChange}
          onStaffClick={handleStaffClick}
        />
        {/* Nenhum funcionário encontrado */}
        {filteredStaff.length === 0 && !loading && (
          <NoStaffCard
            searchTerm={searchTerm}
            specialtyFilter={specialtyFilter}
            statusFilter={statusFilter}
            onAddStaff={() => setIsAddStaffOpen(true)}
          />
        )}
        {/* Modal de detalhes */}
        <StaffDetailsDialog
          open={isStaffDetailsOpen}
          onOpenChange={setIsStaffDetailsOpen}
          staff={selectedStaff}
          onEdit={handleEditStaff}
          onDelete={handleDeleteStaff}
          onToggleStatus={handleToggleStatus}
        />
        {/* Modal de edição */}
        <EditStaffDialog
          open={isEditStaffOpen}
          onOpenChange={setIsEditStaffOpen}
          editStaff={editStaff}
          setEditStaff={setEditStaff}
          handleSaveEdit={handleSaveEditStaff}
          specialties={specialties}
        />
      </div>
    </div>
  );
} 