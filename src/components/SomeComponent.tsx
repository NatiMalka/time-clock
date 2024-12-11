import { Fingerprint, Key } from 'lucide-react';
import { Icon } from './ui/Icon';

// Instead of:
// <Fingerprint className="h-6 w-6" />

// Use:
<Icon icon={Fingerprint} fallback={Key} className="h-6 w-6" /> 