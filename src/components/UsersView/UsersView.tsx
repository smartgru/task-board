import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import debounce from 'lodash/debounce';

import { useApiQuery } from '../../support/api/hooks';
import { BackendEndpoint } from '../../support/api/api-schema';
import { Button, Grid2 as Grid } from '@mui/material';
import UserTable from './UserTable';
import GlobalLoader from '../GlobalLoader/index';
import UserModal from './UserModal';

/**
 * UsersView
 */
export const UsersView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const { data, loading, refetch } = useApiQuery(BackendEndpoint.GetUsers, {
    props: { searchText: query },
  });

  const handleQueryChange = debounce((value: string) => {
    setQuery(value);
    refetch({ searchText: value });
  }, 500);

  return (
    <>
      <Grid
        sx={{ p: 2 }}
        container
        direction="column"
        justifyContent="stretch"
        spacing={2}
      >
        <Grid>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none' }}
            onClick={() => setOpenCreateModal(true)}
          >
            Create user
          </Button>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <UserTable
            users={data || []}
            query={query}
            onChangeQuery={(value) => handleQueryChange(value)}
            onRefresh={refetch}
          />
        </Grid>
      </Grid>
      {loading && <GlobalLoader />}
      {openCreateModal && (
        <UserModal
          onClose={() => setOpenCreateModal(false)}
          onRefresh={refetch}
        />
      )}
    </>
  );
};
