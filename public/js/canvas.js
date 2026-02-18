export class CanvasRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // NEW COLORS: Pink default, Green/Yellow/Red for sorting
        this.colors = {
            default: '#ff79c6',      // Pink - before sorting
            comparing: '#f59e0b',    // Yellow/Orange - comparing
            swapping: '#ef4444',     // Red - swapping
            sorted: '#10b981',       // Green - sorted
            pivot: '#8b5cf6',        // Purple - pivot (for quick sort)
            merging: '#f59e0b',      // Yellow - merging
            heap: '#ef4444',         // Red - heap operation
            background: '#1e1e1e'
        };
        
        this.barGap = 2;
        this.padding = 40;
    }
    
    clear() {
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawBars(array, highlights = {}) {
        this.clear();
        if (!array || array.length === 0) return;
        
        const { 
            comparing = [], 
            swapping = [], 
            sorted = [], 
            pivot = -1, 
            merging = [], 
            heap = [] 
        } = highlights;
        
        const maxValue = Math.max(...array);
        const barWidth = (this.width - 2 * this.padding) / array.length - this.barGap;
        const heightScale = (this.height - 2 * this.padding) / maxValue;
        
        array.forEach((value, index) => {
            const barHeight = value * heightScale;
            const x = this.padding + index * (barWidth + this.barGap);
            const y = this.height - this.padding - barHeight;
            
            let color = this.colors.default;
            
            // Priority order for coloring
            if (sorted.includes(index)) {
                color = this.colors.sorted; // Green
            } else if (swapping.includes(index)) {
                color = this.colors.swapping; // Red
            } else if (comparing.includes(index)) {
                color = this.colors.comparing; // Yellow
            } else if (index === pivot) {
                color = this.colors.pivot; // Purple
            } else if (merging.includes(index)) {
                color = this.colors.merging; // Yellow
            } else if (heap.includes(index)) {
                color = this.colors.heap; // Red
            }
            
            // Draw bar WITHOUT glow
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw value on top
            if (barWidth > 20) {
                this.ctx.fillStyle = '#ffffff';
                this.ctx.font = 'bold 12px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(value, x + barWidth / 2, y - 5);
            }
        });
    }
    
    drawLoading() {
        this.clear();
        this.ctx.fillStyle = '#ff79c6';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Loading... ✨', this.width / 2, this.height / 2);
    }
    
    drawError(message) {
        this.clear();
        this.ctx.fillStyle = '#ef4444';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(message + ' 💔', this.width / 2, this.height / 2);
    }
}