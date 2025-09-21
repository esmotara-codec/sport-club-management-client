
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './asioxSecure';

const useCourts = () => {
    const axiosSecure = useAxiosSecure();

    const { data: courts = [], isLoading, refetch } = useQuery({
        queryKey: ['courts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/get-courts');
            return res.data;
        }
    });

    return [courts, isLoading, refetch];
};

export default useCourts;
